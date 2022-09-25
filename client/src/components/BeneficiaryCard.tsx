import React from "react";

interface Petition {
  petitionID: string;
  userID: string;
  date: string;
  place: string;
}

interface User{
  userID: string;
  state: string;
  city: string;
  phone: string;
}

function BeneficiaryCard(petition: Petition) {

  const getUserById = (userID: string) => {
    
  }

  return (

    <div>
      
    </div>
  )
}

export default BeneficiaryCard;
