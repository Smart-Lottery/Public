import "./RobotPhone.scss";
import robot from "../../assets/images/robot_phone_home.png";
import element_1 from "../../assets/images/robot_phone/element_1.svg";
import element_2 from "../../assets/images/robot_phone/element_2.svg";
import element_3 from "../../assets/images/robot_phone/element_3.svg";
import element_4 from "../../assets/images/robot_phone/element_4.svg";
import element_5 from "../../assets/images/robot_phone/element_5.svg";
import element_6 from "../../assets/images/robot_phone/element_6.svg";

export const RobotPhone = () => {
  return (
    <div className="robot-phone">
      <div className="robot-phone__container">
        <img src={robot} alt="robot" />
        <img src={element_1} alt="robot" className="robot-phone__element-1" />

        <img src={element_2} alt="robot" className="robot-phone__element-2" />
        <img src={element_3} alt="robot" className="robot-phone__element-3" />
        <img src={element_4} alt="robot" className="robot-phone__element-4" />

        <img src={element_5} alt="robot" className="robot-phone__element-5" />
        <img src={element_6} alt="robot" className="robot-phone__element-6" />
      </div>
    </div>
  );
};
