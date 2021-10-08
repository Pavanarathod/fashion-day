import Homepage from "./pages/homepage/Homepage";
import { Route, Switch } from "react-router-dom";

import ShopPage from "./pages/shop/shopPage";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/authpage/SigninPage";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/shop/:shopId" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUp} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
