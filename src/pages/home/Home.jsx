import { useEffect, useState } from "react";

import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import PropertyList from "../../components/propertyList/PropertyList";
import { useUser } from "../../store/userContext";
import alertify from "alertifyjs";

import "./home.css";

const Home = () => {
  const { user, userAxios } = useUser();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userAxios.get(`hotels`);
        setHotels(res.data);
      } catch (err) {
        alertify.set("notifier", "position", "top-center");
        alertify.error(`Something went wrong!`);
      }
    };
    getData();
  }, [user]);

  return (
    <>
      <Header />
      <div className="homeContainer">
        <Featured hotels={hotels} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList hotels={hotels} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties hotels={hotels} />
      </div>
    </>
  );
};

export default Home;
