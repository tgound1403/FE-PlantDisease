import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { Header } from "../../../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { cropData } from "../Data";
import axios from "axios";
import { Footer } from "../../../components/Footer";

import "./index.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 550,
  },
  table: {
    minWidth: 450,
  },
});

export const PredictCrop = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [predictionData, setPredictionData] = useState({});

  const handleChange = (e) => {
    let newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  };

  const click = () => {
    // Tao ra mot Object co ten la data
    const request = new FormData();

    // cho vong lap key trong data them tung key vao data
    for (let key in formData) {
      request.append(key, formData[key]);
    }
    // Su dung phuong thuc post de tra ve data
    axios({
      // phuong thuc post
      method: "POST",
      // duong link api
      url: "https://lobster-app-rken7.ondigitalocean.app/predict_crop",
      // data
      data: request,
      // nhieu du lieu
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        // cai dat lai data bang res.data (data o day la object)
        const responseData = res.data;
        setPredictionData(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackClick = () => {
    setPredictionData({});
  };

  const classes = useStyles();

  const predictedCrop = cropData[predictionData.final_prediction];

  if (predictionData.final_prediction) {
    const outputComponent = (
      <div className="main">
        <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        <div className="output_container">
          <Card className={`${classes.root} output_container__card`}>
            <CardMedia
              component="img"
              alt={predictedCrop.title}
              height="400"
              image={predictedCrop.imageUrl}
              title={predictedCrop.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4">
                <>????? xu???t cho ?????t tr???ng </>
                <b>{predictedCrop.title}</b>
              </Typography>
              <Typography variant="h5" color="textSecondary" component="p">
                {predictedCrop.description}
              </Typography>
              <br />

              <TableContainer component={Paper}>
                <Table
                  size="medium"
                  className={classes.table}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" align="center">
                        <b>D??? ??o??n m?? h??nh XGBoost</b>
                      </TableCell>
                      <TableCell component="th" align="center">
                        <b>D??? ??o??n m?? h??nh ng???u nhi??n</b>
                      </TableCell>
                      <TableCell component="th" align="center">
                        <b>D??? ??o??n m?? h??nh KNN</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        {predictionData.xgb_model_prediction} (
                        {predictionData.xgb_model_probability}%)
                      </TableCell>
                      <TableCell align="center">
                        {predictionData.rf_model_prediction} (
                        {predictionData.rf_model_probability}%)
                      </TableCell>
                      <TableCell align="center">
                        {predictionData.knn_model_prediction} (
                        {predictionData.knn_model_probability}%)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleBackClick()}
                className="back__button"
                variant="contained"
                size="small"
                color="primary"
              >
                Tr??? V??? Trang D??? ??o??n
              </Button>
            </CardActions>
          </Card>
        </div>
        <Footer />
      </div>
    );

    return outputComponent;
  } else
    return (
      <div className="main">
        <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        <div className="form">
          <div className="form__form_group">
            {predictionData.error && (
              <Alert style={{ marginTop: "20px" }} severity="error">
                {" "}
                {predictionData.error}{" "}
              </Alert>
            )}

            <center>
              <div className="form__title">????? xu???t c??y tr???ng cho ?????t</div>
            </center>
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.N}
              className="form__text_field"
              id="N"
              name="N"
              size="medium"
              variant="outlined"
              label="L?????ng Nit?? trong ?????t"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.P}
              className="form__text_field"
              id="P"
              name="P"
              variant="outlined"
              label="L?????ng ph???t pho trong ?????t"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.K}
              className="form__text_field"
              id="K"
              name="K"
              variant="outlined"
              label="L?????ng Kali trong ?????t"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.temperature}
              className="form__text_field"
              id="temperature"
              name="temperature"
              variant="outlined"
              label="Nhi???t ????? (??? Celcius)"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.humidity}
              className="form__text_field"
              id="humidity"
              name="humidity"
              variant="outlined"
              label="????? ???m (t??nh b???ng%)"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.ph}
              className="form__text_field"
              id="ph"
              name="ph"
              variant="outlined"
              label="Gi?? tr??? pH c???a ?????t"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              value={formData.rainfall}
              className="form__text_field"
              id="rainfall"
              name="rainfall"
              variant="outlined"
              label="L?????ng m??a (t??nh b???ng mm)"
            />

            <Button
              onClick={() => click()}
              className="form__button"
              color="primary"
              variant="contained"
            >
              D??? ??o??n C??y
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
};
