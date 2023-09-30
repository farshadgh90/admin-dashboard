import logo from "@assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import { Link, useNavigation } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          <Link to="/register" className="me-2 ms-2">
            {t("login.register")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <label className="form-label">{t("login.password")}</label>
                <input
                  className="form-control form-control-lg mb-2"
                  type="password"
                />
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("login.signingin") : t("login.signin")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
