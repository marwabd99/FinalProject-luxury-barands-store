import BestSellers from "../../components/BestSellers/BestSellers";
import Categories from "../Categories/Categories";
const Home = () => {
  return (
    <div>
      <BestSellers />
      {/* התמונות של נשים / גברים / ילדים */}
      <Categories />
    </div>
  );
};

export default Home;
