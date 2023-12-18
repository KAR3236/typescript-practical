import { DataTypes, Model } from "sequelize";
import { UserModelAttributes } from "../utils/modelInterface";
import { sequelize } from "../helper/db";
import { sendEmail } from "../helper/sendMail";

export interface UserModelInstance
  extends Model<UserModelAttributes>,
    UserModelAttributes {}

export const User = sequelize.define<UserModelInstance>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.afterCreate((user, options) => {
  // Send email logic here...
  sendEmail(
    "Active Your Account",
    "You have to active your account then you will login."
  );
});

User.afterUpdate((user, options) => {
  // Send email logic here...
  if (user.changed("status")) {
    sendEmail(
      "Activated Your Account",
      "Your account has been Activated. You can login with your credential."
    );
  }
});
