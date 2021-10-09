import { Link } from "react-router-dom";
import "./header.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../database/firebase";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import ShoppingCart from "../ShoppingCart";

const Header = ({ currentUser, logoutUser }) => {
  const logout = () => {
    auth.signOut();
    logoutUser();
  };

  return (
    <div className="header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          Shop
        </Link>
        {currentUser ? (
          <p className="option" onClick={logout}>
            Sign out
          </p>
        ) : (
          <Link className="option" to="/signin">
            Signin
          </Link>
        )}
        <Link className="option" to="/shop">
          Contact
        </Link>
        <ShoppingCart total={0} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
