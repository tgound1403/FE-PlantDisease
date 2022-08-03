import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-app-polyfill/stable";
// Components
import { WelcomePage } from "./pages/HomePage";
import { PlantDisease } from "./pages/Prediction/PlantDisease";
import { Profile } from "./pages/Profile";
import { Forum } from "./pages/ForumPage";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { SavedPage } from "./pages/SavedPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Predict } from "./pages/Prediction/Predict";
import { PredictFert } from "./pages/Prediction/Predict-fert";
import { PredictCrop } from "./pages/Prediction/Predict-crop";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/home" component={WelcomePage} />
        <Route path="/du-doan" component={Predict} />
        <Route path="/du-doan-hinh-anh" component={PlantDisease} />
        <Route path="/du-doan-phan-bon" component={PredictFert} />
        <Route path="/du-doan-benh" component={PredictCrop} />
        <Route path="/profile" component={Profile} />
        <Route path="/profilepage" component={ProfilePage} />
        <Route path="/forum" component={Forum} />
        <Route path="/saved" component={SavedPage} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <Route path="/verify" component={VerifyEmail} />
      </Switch>
    </Router>
  );
}
