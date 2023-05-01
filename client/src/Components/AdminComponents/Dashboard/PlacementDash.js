import React from "react";
import { Link } from "react-router-dom";
import HighestPackageChart from "./HighestPackageChart";
import BranchWiseChart from "./BranchWiseChart";
import PlacedStudentChart from "./PlacedStudentChart";
import LatestPlacedStudent from "./LatestPlacedStudent";
import PlacementCoordinators from "./PlacementCoordinators";
import Logo1 from "../img/BrandLogo1.png";
import Logo2 from "../img/BrandLogo2.png";
import Logo3 from "../img/BrandLogo3.png";
import Logo4 from "../img/BrandLogo4.png";
// css
import "./Dashboard.css";

// img
// import img1 from '../img/dp-1.jpg';

function Dashboard() {
  return (
    <>
      <div className="col-sm-12 mx-auto"   style={{
        overFlow:"hscroll", backgroundColor:"pink"
      }}>
        <div className="col-md-12 d-flex ">
          {/* <Link  to='' className="btn btn-primary mr-3  ">
            <i className=''/>Sales
            </Link> 

            <Link  to='' className="btn btn-primary mr-3  ">
            <i className=' '/>Profit %
            </Link>  */}
        </div>

        <div className="row">
          {/* top 4 cards  .............................*/}
          <div className="col-md-3 mt-4">
            <div className="dashboard-top-card color-1 py-5">
              <i className="fa fa-snowflake-o dashboard-top-card-icon text-light" />
              <div>
                <h1 className="text-light bold">1500</h1>
                <h5 className="text-light">Placed Student</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-4">
            <div className="dashboard-top-card color-2 py-5">
              <i className="fa fa-snowflake-o dashboard-top-card-icon text-light" />
              <div>
                <h1 className="text-light bold">50+</h1>
                <h5 className="text-light">Companies</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-4 ">
            <div className="dashboard-top-card color-3 py-5">
              <i className="fa fa-snowflake-o dashboard-top-card-icon text-light" />
              <div>
                <h1 className="text-light bold">120+</h1>
                <h5 className="text-light">Last year placed </h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-4 ">
            <div className="dashboard-top-card color-4 py-5">
              <i className="fa fa-snowflake-o dashboard-top-card-icon text-light" />
              <div>
                <h1 className="text-light bold">$600</h1>
                <h5 className="text-light">Highest Package</h5>
              </div>
            </div>
          </div>

          {/* chart 1 .........................*/}

          <div className="col-md-4 mt-4 " >
            <div className="col-md-12 box shadow  p-4 m-2 chart-box bg-light">
              {/* chart top bar  */}
              <div className="chart-title col-md-12 p-0">
                <h5 className="mr-auto ">Branch wise Placed</h5>
              </div>
              {/* Chart */}
              <div className="chart-container p-4" style={{ height: "100%" }}>
                <BranchWiseChart />
              </div>
            </div>
          </div>

          {/* chart 2 .........................*/}
          <div className="col-md-4 mt-4">
            <div className="col-md-12 box shadow  p-4 m-2 chart-box bg-light">
              {/* chart top bar  */}
              <div className="chart-title col-md-12 p-0">
                <h5 className="mr-auto ">Placed Student </h5>
              </div>
              {/* Chart */}
              <div className="chart-container p-4" style={{ height: "100%" }}>
                <PlacedStudentChart />
              </div>
            </div>
          </div>

          {/* chart 3 .........................*/}
          <div className="col-md-4 mt-4">
            <div className="col-md-12 box shadow  p-4 m-2 chart-box bg-light">
              {/* chart top bar  */}
              <div className="chart-title col-md-12 p-0">
                <h5 className="mr-auto ">Highest Packages </h5>
              </div>
              {/* Chart */}
              <div className="chart-container p-4" style={{ height: "100%" }}>
                <HighestPackageChart />
              </div>
            </div>
          </div>

          {/* Box 5 .........................*/}
          <div className="col-md-6 mt-4">
            <div className="col-md-12 box shadow  p-4 m-2 chart-box bg-light">

              <div className="chart-title col-md-12 p-0">
                <h5 className="mr-auto ">Latest Placed </h5>
              </div>
              <div className="chart-container" style={{ height: "100%" }}>
                <LatestPlacedStudent />
              </div>
            </div>
          </div>

          {/* Box 6 .........................*/}
          <div className="col-md-6 mt-4">
            <div className="col-md-12 box shadow  p-4 m-2 chart-box bg-light">
              <div className="chart-title col-md-12 p-0">
                <h5 className="mr-auto ">Placement Coordinator </h5>
              </div>
              <div className="chart-container" style={{ height: "100%" }}>
                <PlacementCoordinators />
              </div>
            </div>
          </div>
        </div>

        {/* companies ------------------------------------------ */}
        <div className="row mx-0 px-0">
          <div className="col-md-12 box shadow  p-4 m-2">
            <h3 class="mb-5">Companies</h3>
            <div className="row mx-0 px-0">
              <div className="col-sm-2 mx-auto ">
                <img src={Logo1} className=" w-100 h-auto" alt=" ... " />
              </div>
              <div className="col-sm-2 mx-auto ">
                <img src={Logo2} className=" w-100 h-auto" alt=" ... " />
              </div>
              <div className="col-sm-2 mx-auto ">
                <img src={Logo3} className=" w-100 h-auto" alt=" ... " />
              </div>
              <div className="col-sm-2 mx-auto ">
                <img src={Logo4} className=" w-100 h-auto" alt=" ... " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
