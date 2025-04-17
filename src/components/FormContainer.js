import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

const FormContainer = ({ table, type, data, id }) => {
  const [relatedData, setRelatedData] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (!user || type === "delete") return;

    const fetchData = async () => {
      try {
        const fetchMap = {
          alumni: async () => {
            const [careers, careerReplies, rsvps] = await Promise.all([
              axios.get("/api/v1/career"),
              axios.get("/api/v1/careerReplies"),
              axios.get("/api/v1/rSVP"),
            ]);
            return {
              careers: careers.data.data,
              careerReplies: careerReplies.data.data,
              rsvps: rsvps.data.data,
            };
          },

          career: async () => {
            const [alumni, careerReplies] = await Promise.all([
              axios.get("/api/v1/alumniProfile"),
              axios.get("/api/v1/careerReplies"),
            ]);
            return {
              alumni: alumni.data.data,
              careerReplies: careerReplies.data.data,
            };
          },

          careerReply: async () => {
            const [careers, alumni] = await Promise.all([
              axios.get("/api/v1/career"),
              axios.get("/api/v1/alumniProfile"),
            ]);
            return {
              careers: careers.data.data,
              alumni: alumni.data.data,
            };
          },

          event: async () => {
            const rsvps = await axios.get("/api/v1/rSVP");
            return { rsvps: rsvps.data.data };
          },

          rsvp: async () => {
            const [events, alumni] = await Promise.all([
              axios.get("/api/v1/events"),
              axios.get("/api/v1/alumniProfile"),
            ]);
            return {
              events: events.data.data,
              alumni: alumni.data.data,
            };
          },

          gallery: async () => {
            const alumni = await axios.get("/api/v1/alumniProfile");
            return { alumni: alumni.data.data };
          },

          resource: async () => {
            const alumni = await axios.get("/api/v1/alumniProfile");
            return { alumni: alumni.data.data };
          },
        };

        if (fetchMap[table]) {
          const result = await fetchMap[table]();
          setRelatedData(result);
        }
      } catch (error) {
        console.error("Error fetching related data:", error);
      }
    };

    fetchData();
  }, [table, type, user]);

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data} // this will prefill the form on update
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
