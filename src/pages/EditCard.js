import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCard = () => {
  const { id, language, section } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    axios.get(`https://cms-aeo.test/api/ui-build/get-data-by-id/${language}/${section}/${id}`)
      .then(response => {
        setCardData(response.data);
      })
      .catch(error => {
        console.error("Error fetching card data:", error);
      });
  }, [id, section, language]);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  const htmlContent = cardData.data[0].html;

  return (
    <div>
      ...
    </div>
  );
};

export default EditCard;