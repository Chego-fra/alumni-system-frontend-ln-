import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { useAuth } from "@/hooks/auth"; // Using auth hook
import axios from "@/lib/axios";

const FormContainer = ({ table, type, data, id }) => {
  const [relatedData, setRelatedData] = useState({});
  const { user } = useAuth(); // Get authenticated user

  useEffect(() => {
    const fetchData = async () => {
      if (type === "delete") return;
      if (!user) return; // Ensure user is available before fetching

      try {
        let alumni = [];
        let careers = [];
        let careerReplies = [];
        let events = [];
        let rsvps = [];

        switch (table) {
          case "alumni":
            careers = await axios.get("/api/careers");
            setRelatedData({ careers: careers.data });
            break;

          case "career":
            alumni = await axios.get("/api/alumni");
            careerReplies = await axios.get("/api/career-replies");
            setRelatedData({
              alumni: alumni.data,
              careerReplies: careerReplies.data,
            });
            break;

          case "careerReply":
            careers = await axios.get("/api/careers");
            alumni = await axios.get("/api/alumni");
            setRelatedData({ careers: careers.data, alumni: alumni.data });
            break;

          case "event":
            rsvps = await axios.get("/api/rsvps");
            setRelatedData({ rsvps: rsvps.data });
            break;

          case "rsvp":
            events = await axios.get("/api/events");
            alumni = await axios.get("/api/alumni");
            setRelatedData({ events: events.data, alumni: alumni.data });
            break;

          case "gallery":
          case "resource":
            alumni = await axios.get("/api/alumni");
            setRelatedData({ alumni: alumni.data });
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [table, type, user]); // Added `user` as a dependency

  return (
    <div>
      <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} />
    </div>
  );
};

export default FormContainer;
