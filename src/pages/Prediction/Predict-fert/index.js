import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import axios from "axios"


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../api/recommenderapi.js"
import { fertilizerData } from "../Data"
import './index.css'
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "280px",
        backgroundColor: "whitesmoke",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        maxWidth: 550,
    },
    table: {
        minWidth: 450,
    },
}));

export const PredictFert = () => {

    const [isOpenModal, setIsOpenModal] = React.useState(false);


    const [formData, setFormData] = useState({
        temperature: "",
        humidity: "",
        moisture: "",
        soil_type: "",
        crop_type: "",
        nitrogen: "",
        potassium: "",
        phosphorous: "",
    })

    const [predictionData, setPredictionData] = useState({})

    const classes = useStyles();


    const formRenderData = [
        {
            name: "nitrogen",
            description: "Lượng nitơ trong đất"
        },
        {
            name: "potassium",
            description: "Lượng Kali trong đất"
        },
        {
            name: "phosphorous",
            description: "Lượng phốt pho trong đất"
        },
        {
            name: "temperature",
            description: "Nhiệt độ (ở Celcius)"
        },
        {
            name: "humidity",
            description: "Độ ẩm (tính bằng%)"
        },
        {
            name: "moisture",
            description: "Độ ẩm trong đất"
        },

    ]

    const soilTypes = ['đất cát pha', 'đất pha sét', 'đất đen', 'đất đỏ', 'đất sét']
    const cropTypes = ['ngô', 'mía', 'bông', 'thuốc lá', 'lúa', 'lúa mạch', 'lúa mì', 'kê', 'hạt dầu', 'bột giấy', 'hạt xay']

    const handleChange = (e, changeKey = undefined) => {
        // console.log(changeKey, e.target.value)
        let newData = { ...formData }
        if (changeKey) {
            newData[changeKey] = e.target.value
        }
        else newData[e.target.id] = e.target.value
        console.log(newData)
        setFormData(newData)
    }

    const handleClick = () => {
        // Tao ra mot Object co ten la data
        const request = new FormData()

        // cho vong lap key trong data them tung key vao data
        for (let key in formData) {
            request.append(key, formData[key])
        }
        console.log(request)
        // Su dung phuong thuc post de tra ve data 
        axios({
            // phuong thuc post
            method: 'POST',
            // duong link api
            url: 'http://localhost:5000/predict_fertilizer',
            // data
            data: request,
            // nhieu du lieu
            headers: { "Content-Type": "multipart/form-data" },

        }).then((res) => {
            // cai dat lai data bang res.data (data o day la object)
            const responseData = res.data;
            console.log(responseData)
            setPredictionData(responseData);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleBackClick = () => {
        setPredictionData({})
    }

    const predictedFertilizer = fertilizerData[predictionData.final_prediction]



    if (predictionData.final_prediction) {

        const outputComponent = (

            <div className="main">
                <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
                <div className="output_container">
                    <Card className={`${classes.root} output_container__card`}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            alt={predictedFertilizer.title}
                            height="225"
                            image={predictedFertilizer.imageUrl}
                            title={predictedFertilizer.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                Đề xuất cho đất dùng phân bón <b>{predictedFertilizer.title}</b>
                            </Typography>
                            <Typography variant="h5" color="textSecondary" component="p">
                                {predictedFertilizer.description}
                            </Typography>
                            <br />

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell component="th" align="center"><b>Dự đoán mô hình XGBoost</b></TableCell>
                                            <TableCell component="th" align="center"><b>Dự đoán mô hình ngẫu nhiên</b></TableCell>
                                            <TableCell component="th" align="center"><b>Dự đoán mô hình SVM</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">{predictionData.xgb_model_prediction} ({predictionData.xgb_model_probability}%)</TableCell>
                                            <TableCell align="center">{predictionData.rf_model_prediction} ({predictionData.rf_model_probability}%)</TableCell>
                                            <TableCell align="center">{predictionData.svm_model_prediction} ({predictionData.svm_model_probability}%)</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </CardContent>
                        {/* </CardActionArea> */}
                        <CardActions>
                            <Button onClick={() => handleBackClick()} className="back__button" variant="contained" size="small" color="primary">
                                Trở về trang dự đoán
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                <Footer />
            </div>
        )

        return outputComponent


    }


    else return (
        <div className="main">
            <Header isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

            <div className="form">
                <div className="form__form_group">

                    {
                        predictionData.error &&
                        <Alert style={{ marginTop: "20px" }} severity="error"> {predictionData.error} </Alert>
                    }

                    <center><div className="form__title">Đề xuất phân bón cho đất</div></center>

                    {
                        formRenderData.map((formAttribute) => {
                            return <TextField
                                key={formAttribute.name}
                                onChange={(e) => handleChange(e)}
                                value={formData[formAttribute.name]}
                                className="form__text_field"
                                id={formAttribute.name}
                                name={formAttribute.name}
                                variant="filled"
                                label={formAttribute.description}
                            />
                        })
                    }


                    <TextField
                        id="soil_type"
                        name="soil_type"
                        select
                        label="Loại đất"
                        value={formData.soil_type}
                        onChange={(e) => handleChange(e, "soil_type")}
                        SelectProps={{
                            native: true,
                        }}
                        variant="filled"
                        className="form__text_field"
                    >
                        <option key={"select"} value={"select"}>
                            {"Chọn"}
                        </option>
                        {soilTypes.map((soiltype) => (
                            <option key={soiltype} value={soiltype}>
                                {soiltype}
                            </option>
                        ))}
                    </TextField>


                    <TextField
                        id="soil_type"
                        name="soil_type"
                        select
                        label="Loại hạt"
                        value={formData.crop_type}
                        onChange={(e) => handleChange(e, "crop_type")}
                        SelectProps={{
                            native: true,
                        }}
                        variant="filled"
                        className="form__text_field"
                    >
                        <option key={"select"} value={"select"}>
                            {"Chọn"}
                        </option>
                        {cropTypes.map((croptype) => (
                            <option key={croptype} value={croptype}>
                                {croptype}
                            </option>
                        ))}
                    </TextField>

                    {/* <div style={{display:"flex",justifyContent:"space-around", flexWrap:"wrap"}}>
                <FormControl variant="filled" className={`${classes.formControl} form__select`}>
                    <InputLabel id="demo-simple-select-filled-label">Soil Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="soil_type"
                    name="soil_type"
                    value={formData.soil_type}
                    onChange={(e) => handleChange(e, "soil_type")}
                    >
                    {
                        soilTypes.map((soiltype) => {
                            return <MenuItem key={soiltype} value={soiltype}>{soiltype}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>

                <FormControl variant="filled" className={`${classes.formControl} form__select`}>
                    <InputLabel id="demo-simple-select-filled-label">Crop Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="crop_type"
                    name="crop_type"
                    value={formData.crop_type}
                    onChange={(e) => handleChange(e, "crop_type")}
                    >
                    {
                        cropTypes.map((cropType) => {
                            return <MenuItem key={cropType} value={cropType}>{cropType}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
                </div> */}

                    <Button onClick={() => handleClick()} className="form__button" color="primary" variant="contained">Dự đoán phân bón</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
}


