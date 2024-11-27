import OrdersTable from "../components/OrdersTable";
import RoundedImage from "../assets/rounded-square.png";
const Dashboard = () => {
    return (
        <div>
            <div className="flex justify-center">
                <img src={RoundedImage} alt="orders-dashboard-img" />
            </div>
            <h1 className="text-center text-lg md:text-xl lg:text-2xl font-semibold mb-6">
                Orders Dashboard
            </h1>
            <OrdersTable />
        </div>
    );
};

export default Dashboard;
