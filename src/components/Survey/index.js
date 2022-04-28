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
  const genderList = ["Erkek", "Kadın", "Belirtmek istemiyorum"];
  const groupList = ["Yalnızım", "Çift", "Aile", "Arkadaşlar"];
  const categoryList = [
    "Havaalanı",
    "Eğlence Parkı",
    "Akvaryum",
    "Sanat",
    "Bar",
    "Kitapçı",
    "Kafe",
    "Kamp Alanı",
    "Kilise",
    "Belediye Binası",
    "Kütüphane",
    "Cami",
    "Tiyatro",
    "Müze",
    "Gece Kulübü",
    "Park",
    "Restoran",
    "Alışveriş Merkezi",
    "Turistik Yerler",
    "Hayvanat Bahçesi",
  ];
  const placesList = ["Galata Kulesi", "Kız Kulesi", "Beşiktaş Çarşı"];

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
    }
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
            <label htmlFor="age">Lütfen yaşını seç.</label>
            <select
              name="age"
              value={values.age}
              type="select"
              onChange={handleChange}
            >

<option style={{display:"none"}}></option>
              <option>{ageList[0]}</option>
              <option>{ageList[1]}</option>
              <option>{ageList[2]}</option>
              <option>{ageList[3]}</option>
              <option>{ageList[4]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="gender">Cinsiyetini seç.</label>
            <select
              name="gender"
              value={values.gender}
              type="select"
              onChange={handleChange}
            >

<option style={{display:"none"}}></option>
              <option>{genderList[0]}</option>
              <option>{genderList[1]}</option>
              <option>{genderList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="isAlone">Tatilini kiminle yapıyorsun?</label>
            <select
              name="isAlone"
              value={values.isAlone}
              type="select"
              onChange={handleChange}
            >

<option style={{display:"none"}}></option>
              <option>{groupList[0]}</option>
              <option>{groupList[1]}</option>
              <option>{groupList[2]}</option>
              <option>{groupList[3]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Hmm. Anlıyorum." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Hava {Temperature} {Weather}." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="category">
              Şimdi tatilinin temasına karar verme zamanı.
            </label>
            <select
              name="category"
              value={values.category}
              type="select"
              onChange={handleChange}
            >

              <option style={{display:"none"}}></option>
              <option>{categoryList[0]}</option>
              <option>{categoryList[1]}</option>
              <option>{categoryList[2]}</option>
              <option>{categoryList[3]}</option>
              <option>{categoryList[4]}</option>
              <option>{categoryList[5]}</option>
              <option>{categoryList[6]}</option>
              <option>{categoryList[7]}</option>
              <option>{categoryList[8]}</option>
              <option>{categoryList[9]}</option>
              <option>{categoryList[10]}</option>
              <option>{categoryList[11]}</option>
              <option>{categoryList[12]}</option>
              <option>{categoryList[13]}</option>
              <option>{categoryList[14]}</option>
              <option>{categoryList[15]}</option>
              <option>{categoryList[16]}</option>
              <option>{categoryList[17]}</option>
              <option>{categoryList[18]}</option>
              <option>{categoryList[19]}</option>
              <option>{categoryList[20]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bu koşullar altında nereleri gezmek istersin?" />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place1">1. Seçim</label>
            <select
              name="place1"
              value={values.place1}
              type="select"
              onChange={handleChange}
              
            >

              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place2">2. Seçim</label>
            <select
              name="place2"
              value={values.place2}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place3">3. Seçim</label>
            <select
              name="place3"
              value={values.place3}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place4">4. Seçim</label>
            <select
              name="place4"
              value={values.place4}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place5">5. Seçim</label>
            <select
              name="place5"
              value={values.place5}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place6">6. Seçim</label>
            <select
              name="place6"
              value={values.place6}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place7">7. Seçim</label>
            <select
              name="place7"
              value={values.place7}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place8">8. Seçim</label>
            <select
              name="place8"
              value={values.place8}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place9">9. Seçim</label>
            <select
              name="place9"
              value={values.place9}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner>
            <label htmlFor="place10">10. Seçim</label>
            <select
              name="place10"
              value={values.place10}
              type="select"
              onChange={handleChange}
            >
              <option style={{display:"none"}}></option>
              <option>{placesList[0]}</option>
              <option>{placesList[1]}</option>
              <option>{placesList[2]}</option>
            </select>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Katıldığın için teşekkür ederiz." />
        </SwiperSlide>

        <SwiperSlide>
          <button form="myform" type="submit">
            Submit
          </button>
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
      </Swiper>
    </>
  );
}

export default Survey;
