import Homepage from "./pages/homepage/Homepage";
import { Route, Switch, Redirect } from "react-router-dom";

import ShopPage from "./pages/shop/shopPage";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/authpage/SigninPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./database/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./actions/userActions";

import React from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const createNewUser = async () => {
          if (!user) return;

          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            userId: user.uid,
            createdAt: new Date(),
          });
        };

        const getUserData = async () => {
          if (!user) return;

          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setCurrentUser({
                id: docSnap.id,
                ...docSnap.data(),
              });
            }
          } catch (error) {
            alert(error.message);
          }
        };
        getUserData();
        createNewUser();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/shop/:shopId" component={ShopPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
