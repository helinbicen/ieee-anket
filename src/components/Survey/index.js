// Import Swiper React components
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { getDatabase, ref, set } from "firebase/database";

import { useAuth } from "../../context/UserContext";

import SurveyInner from "../SurveyInner";

import WnextLogo from "../../assets/wnext.png";
import WdataLogo from "../../assets/wdata.png";

import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.css";

function Survey() {
  function writeUserData(user, values) {
    const db = getDatabase();
    set(ref(db, "users/" + user.uid), {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      ...values,
    });
  }

  const [city, setCity] = useState([]);

  const cityUrl = `https://wdatamaterial.ieeeiuc.com/api/city`;

  useEffect(() => {
    axios
      .get(cityUrl)
      .then((res) => {
        setCity(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { user, signOutGoogle } = useAuth();

  const navigate = useNavigate();

  const [pageCount, setActiveIndex] = useState(0);

  useEffect(() => {
    if (user.length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  const cityList = ["İstanbul", "İzmir", "Ankara"];
  const stateList = ["Avcılar", "Konak", "Kızılay"];
  const ageList = ["0-18", "18-30", "30-45", "45-60", "+60"];
  const genderList = ["Erkek", "Kadın", "Belirtmek istemiyorum"];
  const groupList = ["Yalnızım", "Çift", "Aile", "Arkadaşlar"];
  const transportationList = ["Toplu taşıma", "Özel araç", "Yaya"];
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
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      writeUserData(user, values);
    },
  });

  return (
    <>
      <div className="navbar">
        <div className="navbar-right">
          <img src={user.photoURL} alt={user.displayName} />
          <h3>{user.displayName}</h3>
        </div>

        <button onClick={signOutGoogle} className="navbar-exit">
          ÇIKIŞ YAP
        </button>
      </div>

      <div className="image-content">
        <img
          src={WnextLogo}
          alt="WNEXT"
          className={pageCount !== 0 ? " wnext-logo" : "wnext-logo hidden"}
        />
      </div>

      <form id="myform" onSubmit={handleSubmit}></form>
      <Swiper
        direction={"vertical"}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper"
        allowTouchMove={true}
      >
        <SwiperSlide>
          <SurveyInner
            image={<img src={WdataLogo} alt="WNEXT" className="wdata-logo" />}
            bgTitle="Hoş geldin!"
            mdTitle="Hadi seninle bir senaryoya başlayalım."
            prevButtonShow={false}
          ></SurveyInner>
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
          <SurveyInner mdTitle="Gezintiye başlamak için şehir ve ilçe seç.">
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="city"
                value={values.city}
                type="select"
                onChange={handleChange}
              >
                {city.map((city) => (
                  <option key={city}>{city["city"]}</option>
                ))}

                {/* <option style={{ display: "none" }}></option>
                <option>{cityList[0]}</option>
                <option>{cityList[1]}</option>
                <option>{cityList[2]}</option> */}
              </select>
            </label>

            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="state"
                value={values.state}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{stateList[0]}</option>
                <option>{stateList[1]}</option>
                <option>{stateList[2]}</option>
              </select>
            </label>

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
          <SurveyInner mdTitle="Güzel. Seni biraz daha yakından tanımak istiyoruz." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Lütfen yaşını seç.">
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="age"
                value={values.age}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{ageList[0]}</option>
                <option>{ageList[1]}</option>
                <option>{ageList[2]}</option>
                <option>{ageList[3]}</option>
                <option>{ageList[4]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Cinsiyetini seç.">
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect2"
                name="gender"
                value={values.gender}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{genderList[0]}</option>
                <option>{genderList[1]}</option>
                <option>{genderList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Tatilini kiminle yapıyorsun?">
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect3"
                name="isAlone"
                value={values.isAlone}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{groupList[0]}</option>
                <option>{groupList[1]}</option>
                <option>{groupList[2]}</option>
                <option>{groupList[3]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Ulaşım şeklini seç.">
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect3"
                name="transportation"
                value={values.transportation}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{transportationList[0]}</option>
                <option>{transportationList[1]}</option>
                <option>{transportationList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Hmm. Anlıyorum." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Hava Şu An {Temperature} {Weather}." />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Şimdi tatilinin temasına karar verme zamanı.">
            <label className="custom-select" htmlFor="styledSelect4">
              <select
                id="styledSelect4"
                name="category"
                value={values.category}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
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
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bu koşullar altında nereleri gezmek istersin?" />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner title="1. Seçim">
            <label className="custom-select" htmlFor="styledSelect5">
              <select
                id="styledSelect5"
                name="place1"
                value={values.place1}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="2. Seçim">
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place2"
                value={values.place2}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="3. Seçim">
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place3"
                value={values.place3}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="4. Seçim">
            <label className="custom-select" htmlFor="styledSelect7">
              <select
                id="styledSelect6"
                name="place4"
                value={values.place4}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner title="5. Seçim">
            <label className="custom-select" htmlFor="styledSelect8">
              <select
                id="styledSelect5"
                name="place5"
                value={values.place5}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                <option>{placesList[0]}</option>
                <option>{placesList[1]}</option>
                <option>{placesList[2]}</option>
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Katıldığın için teşekkür ederiz." />
        </SwiperSlide>

        <SwiperSlide>
          <button
            form="myform"
            type="submit"
            className="submit-button"
            onClick={() => window.location.reload()}
          >
            GÖNDER
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Survey;
