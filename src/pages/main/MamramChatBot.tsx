import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ReactWebChat, { createDirectLine, createStore } from "botframework-webchat";
import * as msal from "@azure/msal-browser"; // Import the 'msal' library

const styleOptions = {
  backgroundColor: '#f0f0f0',
  color: '#333',
  padding: '10px',
  borderRadius: '5px',
  height: '500px',
  width: '400px',
}
var clientApplication: any;
(function () {
  var msalConfig = {
    auth: {
      clientId: '<ClientID>',
      authority: 'https://login.microsoftonline.com/<TenantID>',
      redirectUri: "<appURI>"
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false
    }
  };
  if (!clientApplication) {

    clientApplication = new msal.PublicClientApplication(msalConfig);
  }
}());

const MamramChatBot: React.FC = () => {
  const [directLine, setDirectLine] = useState<ReturnType<
    typeof createDirectLine
  > | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(
          "https://b9d052cebfc8e44e900c2880c75c8d.12.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr811_copilot/directline/token?api-version=2022-03-01-preview"
        );
        const { token } = res.data;

        setDirectLine(createDirectLine({ token }));
      } catch (error: any) {
        console.error("Error fetching DirectLine token:", error);
      }
    };
    fetchToken();
  }, []);

  async function acquireAccessToken(scopes: any, userEmail: any, user: any) {
    const accessTokenRequest: any = {
      scopes: scopes,
      loginHint: userEmail,
      account: user
    };

    return clientApplication.acquireTokenSilent(accessTokenRequest).then((response: any) => {
      return response.accessToken;
    }).catch((silentError: any) => {
      console.log(silentError);
      if (silentError) {
        return clientApplication.loginPopup(accessTokenRequest).then((response: any) => {
          console.log("loginPopup2")
          return response.accessToken;
        }).catch((error: any) => {
          // console.log(error);
          return null;
        });
      }
      return null;
    });
  }

  const store = useMemo(() =>
    createStore({}, ({ dispatch }: any) => (next: any) => (action: any) => {
      const { type } = action;
      if (type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        dispatch({
          type: 'WEB_CHAT/SEND_EVENT',
          payload: {
            name: 'startConversation',
            type: 'event',
            value: { text: "hello" }
          }
        });
        return next(action);
      }
      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const activity = action.payload.activity;
        // console.log( activity);

        if (activity.from.role === "user" && activity.text == "thumbsDown") {
        
          directLine && directLine.postActivity({
            type: 'invoke',
            name: 'thumbsDown',
            value: "thumbsDown",
            "from": {
              id: userId,
              name: user.name,
              role: "user"
            }
          })

        }
        if (activity.from && activity.from.role === 'bot' &&
          activity.attachments &&
          activity.attachments[0] &&
          activity.attachments[0].contentType === 'application/vnd.microsoft.card.oauth' &&
          activity.attachments[0].content.tokenExchangeResource
        ) {
          scopes = [activity.attachments[0].content.tokenExchangeResource.uri];
          // console.log(scopes)
          let user = clientApplication.getAllAccounts()[0]
          let userEmail = user.username
          console.log("Email: " + userEmail + "account: " + user)
          acquireAccessToken(scopes, userEmail, user).then(function (token: any) {
            // console.log('this happend')
            if (token) {
              directLine.postActivity({
                type: 'invoke',
                name: 'signin/tokenExchange',
                value: {
                  id: activity.attachments[0].content.tokenExchangeResource.id,
                  connectionName: activity.attachments[0].content.connectionName,
                  token
                },
                "from": {
                  id: userId,
                  name: user.name,
                  role: "user"
                }
              }).subscribe(
                (id: any) => {
                  if (id === 'retry') {
                    // bot was not able to handle the invoke, so display the oauthCard
                    // console.log('error')
                    return next(action);
                  }
                  // else: tokenexchange successful and we do not display the oauthCard
                },
                (error: any) => {
                  // an error occurred to display the oauthCard
                  // console.log('error2')
                  return next(action);
                }
              );
              return;
            }
            else
              return next(action);
          });
        }
        else
          return next(action);
      }
      else
        return next(action);
    }),
    []
  );

  return (
    <section>
      {/* <header>Chat component is using React {React.version}</header> */}
      <div className="react-container webchat">
        {!!directLine && (
          <ReactWebChat directLine={directLine} styleOptions={styleOptions} store={store} />
        )}
      </div>
    </section>
  );
};

export default MamramChatBot;