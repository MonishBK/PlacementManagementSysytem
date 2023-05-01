import React, {useEffect, useState } from "react";
// import Routing,{UserData} from "./Routing";


const Checking = () => {

  const [Data, setData] = useState({})

  const ReloadData = async () => {
    try {
      const res = await fetch("/datafetch", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "applictaion/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setData(data);
      // console.log("from the checking component==>",data);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
    //   history.push('/');
    }
  };

  useEffect(() => {
    console.log("from checking");
    // ReloadData();
  }, []);

  return (
    <>
      {/* <UserData.Provider value={Data}> */}
        {/* <Routing /> */}
      {/* </UserData.Provider> */}
    </>
  );
};

export default Checking;
