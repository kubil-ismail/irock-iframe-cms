import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCard = () => {
  const { id, language, section } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    axios.get(`https://cms-aeo.test/api/ui-build/get-data-by-id/${language}/${section}/${id}`)
      .then(response => {
        console.log(response.data);
        setCardData(response.data);
      })
      .catch(error => {
        console.error("Error fetching card data:", error);
      });
  }, [id, section, language]);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  // const elements = cardData[0].elements;

  return (
    <div>
      <h1>{cardData[0].title}</h1>
      <p>Edit Card ID: {cardData[0].id}</p>
      <div>
        {cardData[0].elements.map((element, index) => (
          <div key={index} className={element.attribute.className.join(' ')} style={element.attribute.style}>
            {element.children.map((child, index) => (
              <div key={index} className={child.attribute.className.join(' ')} style={child.attribute.style}>
                {child.children.map((grandchild, index) => (
                  <div key={index} className={grandchild.attribute.className.join(' ')} style={grandchild.attribute.style}>
                    {grandchild.children.map((grandgrandchild, index) => (
                      <p key={index} style={grandgrandchild.attribute.style}>{grandgrandchild.text}</p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCard;