import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { fetchWebhook, updateWebhook } from "../services/webhook";
import { WEBHOOK_SUBSCRIPTION_STATUS } from "../../constant";
import { io } from "socket.io-client";
import { getItemFromLocalStorage } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import { EmptyIcon } from "../component/Icons";
import { UserLogout } from "../component/UserLogout";
const SOCKET_URL = import.meta.env.VITE_API_SOCKET_URL;
const socket = io(SOCKET_URL);

socket.on("connect", () => {
  const token = getItemFromLocalStorage("token");
  console.log("Connected to server");
  socket.emit("save-user", {
    token,
  });
});
socket.on("webhook-event", (data) => {
  console.log("Received event from server:", data);
  const eventData = data.data.event.data;
  const formattedData = Object.entries(eventData)
    .map(([key, value]) => `<b>${key}</b>: ${value}`)
    .join("<br/>");

  toast.info(<CustomToast formattedData={formattedData} />, {
    autoClose: 10000,
    position: "top-center",
    style: {
      minWidth: "500px",
    },
  });
});

const CustomToast = ({ formattedData }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `Received event:<br/>${formattedData} <br/> <div className='text-center'>You are receiving this notification because you are subscribed to this webhook.</div>`,
    }}
  />
);

const Dashboard = () => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [webhook, setWebhook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isLoggedIn() && !isLoading) {
      getWebhooks();
    }
  }, [isLoading, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn() && !isLoading) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading]);

  const getWebhooks = async () => {
    try {
      setLoading(true);
      const response = await fetchWebhook();
      setWebhook(response.data.webhooks);
    } catch (error) {
      console.log(`Error in fetching webhooks: ${error}`);
      toast.error("Error in fetching webhooks. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async (id, status) => {
    try {
      await updateWebhook({ id, status });
      setWebhook((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, status } : item))
      );
    } catch (error) {
      console.log(`Error in updating webhook: ${error}`);
      toast.error("Error in updating webhook. Please try again later");
    }
  };

  const handleSubscribe = (id) => {
    handleSubscription(id, WEBHOOK_SUBSCRIPTION_STATUS.SUBSCRIBED, true);
  };

  const handleUnsubscribe = (id) => {
    handleSubscription(id, WEBHOOK_SUBSCRIPTION_STATUS.UNSUBSCRIBED, false);
  };

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center flex-col mt-4">
      <UserLogout />
      <div className="w-full p-8 sm:p-12 mx-4 md:p-16">
        <h1 className="text-center text-xl md:text-3xl">
          {`${user?.name ? `${user.name}'s` : "MY"}`} WEB'OOK
        </h1>
        {webhook?.length > 0 ? (
          <ul>
            {webhook?.map((item) => (
              <li key={item.id} className="border-b py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Source URL: {item.source}</p>
                    <p>Callback URL: {item.callback}</p>
                    <p className="text-slate-500">
                      Status: {item.status?.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    {item.status === WEBHOOK_SUBSCRIPTION_STATUS.SUBSCRIBED ? (
                      <button
                        className="bg-red-700 hover:bg-red-600 text-white px-4 py-2"
                        onClick={() => handleUnsubscribe(item.id)}
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <button
                        className="bg-green-700 hover:bg-green-600 transition transition-all duration-400 text-white px-4 py-2"
                        onClick={() => handleSubscribe(item.id)}
                      >
                        Subscribe
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className=" flex items-center mt-6 flex-col justify-center">
            <EmptyIcon />
            <p className="text-center mt-4">
              HMM.. SEEMS LIKE YOU ARE NEW HERE!!
            </p>
          </div>
        )}
        <div className="text-center">
          <button
            className="bg-black text-white tracking-widest h-12 px-4 mt-12"
            onClick={() => navigate("/create-webhook")}
          >
            + CREATE WEBHOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
