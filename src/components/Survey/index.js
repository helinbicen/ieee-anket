// Import Swiper React components
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormik } from "formik";
import {
  TextField,
  Autocomplete,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import SurveyInner from "../SurveyInner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.css";

import { useSwiper } from "swiper/react";

function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
  );
}

function Survey() {
  const ageList = ["0-18", "18-30", "30-45", "45-60", "+60"];
  const [value, setValue] = useState("");
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      city: "",
      state: "",
      age: "",
      gender: "",
      isAlone: "",
      category: "",
      place1: "",
      place2: "",
      place3: "",
      place4: "",
      place5: "",
      place6: "",
      place7: "",
      place8: "",
      place9: "",
      place10: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form id="myform" onSubmit={handleSubmit}></form>
      <Swiper
        direction={"vertical"}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
        allowTouchMove={true}
      >
        <SwiperSlide>
          <SurveyInner
            bgTitle="Hoş geldin!"
            mdTitle="Hadi seninle bir senaryoya başlayalım."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner
            mdTitle="WNEXT’in teknofest macerasında yapay zekanın bir parçası olmak için
            lütfen devam et."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Kendi hikayeni planlamanı istiyoruz." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Hazırsan sorulara başlayalım." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city-state">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="text"
              placeholder="Şehir"
              onChange={handleChange}
            />

            <input
              name="state"
              value={values.state}
              type="text"
              placeholder="İlçe"
              onChange={handleChange}
            />

            {/* <TextField
              autoComplete="new-password"
              className="text-field"
              id="standard-basic"
              variant="standard"
              color="primary"
              placeholder="Bir şeyler yaz..."
              form="myform"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.city}
            /> */}
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Güzel." />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Seni biraz daha yakından tanımak istiyoruz." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="age">
            Lütfen yaşını seç.
            </label>
            <select
              name="age"
              value={values.age}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            >
              <option>{ageList[0]}</option>
              <option>{ageList[1]}</option>
              <option>{ageList[2]}</option>
              <option>{ageList[3]}</option>
              <option>{ageList[4]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            />
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            />
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            />
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            />
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            />
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <label htmlFor="city">
              Gezintiye başlamak için şehir ve ilçe seç.
            </label>
            <input
              name="city"
              value={values.city}
              type="select"
              placeholder="Bir şeyler yaz..."
              onChange={handleChange}
            />
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <div className="question-container">
              <h4>Lütfen yaşını seç.</h4>

              <div className="age-choices">
                <button>{ageList[0]}</button>
                <button>{ageList[1]}</button>
                <button>{ageList[2]}</button>
                <button>{ageList[3]}</button>
                <button>{ageList[4]}</button>
              </div>
            </div>
          </SurveyInner>
        </SwiperSlide>
        {/* <SwiperSlide>
          <SurveyInner mdTitle="Bla bla bla flan!">
            <Autocomplete
              id="lastName"
              options={[
                "The Godfather",
                "Pulp Fiction2",
                "Pulp Fiction3",
                "Pulp Fiction4",
                "Pulp Fiction5",
                "Pulp Fiction6",
                "Pulp Fiction7",
              ]}
              style={{ width: "100%" }}
              name="lastName"
              onChange={(e, newValue) => {
                formik.values.lastName = newValue;
              }}
              value={formik.values.lastName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  autoComplete="new-password"
                />
              )}
            />
          </SurveyInner>
        </SwiperSlide> */}
        <SwiperSlide>
          <button form="myform" type="submit">
            Submit
          </button>
        </SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

export default Survey;
