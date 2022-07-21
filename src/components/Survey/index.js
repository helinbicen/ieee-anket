// Import Swiper React components
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getDatabase, ref, set } from "firebase/database";

import { useAuth } from "../../context/UserContext";

import SurveyInner from "../SurveyInner";

import WnextLogo from "../../assets/wnext.png";
import WdataLogo from "../../assets/wdata_black.png";

import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.css";
import "@sweetalert2/theme-dark/dark.css";

function Survey() {
  const { user, signOutGoogle } = useAuth();

  const navigate = useNavigate();

  //Aktif sayfanın indexini tutan state
  const [pageCount, setActiveIndex] = useState(0);

  //Api'den dönen verileri tutan stateler
  const [cities, setCities] = useState([]);
  const [distict, setDistict] = useState([]);
  const [weather, setWeather] = useState([]);
  const [category, setCategories] = useState([]);
  const [getplace, setGetplaces] = useState([]);

  function writeUserData(user, values) {
    const sendingTime = new Date().getTime();
    const db = getDatabase();
    set(ref(db, "users/" + user.uid + "_" + sendingTime), {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      ...values,
    });
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      weather_id: weather.id,
      plate_code: "",
      city: "",
      state: "",
      age: "",
      age_id :"",
      gender: "",
      gender_id: "",
      group: "",
      category: "",
      weather: "",
      temperature: "",
      transportation_id:"",
      place1: "",
      place2: "",
      place3: "",
      place4: "",
      place5: "",
      place1_id: "",
      place2_id: "",
      place3_id: "",
      place4_id: "",
      place5_id: "",
    },
    onSubmit: (values) => {
      writeUserData(user, values);
      Swal.fire({
        title: "Tebrikler!",
        text: "Girilen bilgiler başarıyla kaydedildi.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tekrar doldur!",
        cancelButtonText: "Çıkış yap!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          signOutGoogle();
        }
      });
    },
  });

  useEffect(() => {
    const cityUrl = `https://wdatamaterial.ieeeiuc.com/api/city`;
    const weatherUrl = `https://wdatamaterial.ieeeiuc.com/api/weather`;
    const categoryUrl = `https://wdatamaterial.ieeeiuc.com/api/category`;
    const getplaceUrl = `https://wdatamaterial.ieeeiuc.com/api/getplace/`;

    const selected_city = cities.find((item) => item.city === values.city);
    const plate_code = selected_city?.plate_code;
    values.plate_code = plate_code;

    axios
      .get(weatherUrl)
      .then((res) => {
        setWeather(res.data);
        values.weather_id = res?.data?.id;
        values.weather = res?.data?.weather;
        values.temperature = res?.data?.temperature;

      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(cityUrl)
      .then((res) => {
        setCities(res.data["message"]);
        console.log("city url", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(categoryUrl)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(getplaceUrl + (values.plate_code ? values.plate_code : 7))
      .then((res) => {
        setGetplaces(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const getplaceUrl = `https://wdatamaterial.ieeeiuc.com/api/getplace/`;
    const distictUrl = `https://wdatamaterial.ieeeiuc.com/api/distict/`;

    const selected_city = cities.find((item) => item.city === values.city);
    const plate_code = selected_city?.plate_code;
    values.plate_code = plate_code;
    axios
      .get(distictUrl + plate_code)
      .then((res) => {
        setDistict(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(getplaceUrl + plate_code)
      .then((res) => {
        setGetplaces(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [values.city]);

  useEffect(() => {
    if (user.length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  //const cityList = ["İstanbul", "İzmir", "Ankara"];
  //const stateList = ["Avcılar", "Konak", "Kızılay"];
  const ageList = ["0-18", "18-30", "30-45", "45-60", "+60"];
  const genderList = ["Erkek", "Kadın", "Belirtmek istemiyorum"];
  const groupList = ["Yalnızım", "Çift", "Aile", "Arkadaşlar"];
  const transportationList = ["Toplu taşıma", "Özel araç", "Yaya"];
  //const categoryList = [
  //  "Havaalanı",
  //   "Eğlence Parkı",
  //   "Akvaryum",
  //   "Sanat",
  //   "Bar",
  //   "Kitapçı",
  //   "Kafe",
  //   "Kamp Alanı",
  //   "Kilise",
  //   "Belediye Binası",
  //   "Kütüphane",
  //   "Cami",
  //   "Tiyatro",
  //   "Müze",
  //   "Gece Kulübü",
  //   "Park",
  //   "Restoran",
  //   "Alışveriş Merkezi",
  //   "Turistik Yerler",
  //   "Hayvanat Bahçesi",
  // ];
  // const placesList = ["Galata Kulesi", "Kız Kulesi", "Beşiktaş Çarşı"];

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
            mdTitle="WNEXT’in teknofest macerasında yapay zekanın bir parçası olmak için
            lütfen yukarı kaydır."
            prevButtonShow={false}
            swipeAnimation={true}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner
            bgTitle="Tercihlerin bizim için önemli."
            mdTitle="Gireceğin etkenlere göre gezmek isteyeceğin 5 mekanı seçmeni istiyoruz."
          />
        </SwiperSlide>
        <SwiperSlide>
          <SurveyInner
            mdTitle="Gezintiye başlamak için şehir ve ilçe seç."
            nextButtonShow={false}
            prevButtonShow={false}
          >
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="city"
                value={values.city}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                {cities &&
                  cities.map((data, index) => (
                    <option key={index}>{data["city"]}</option>
                  ))}
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
                {distict &&
                  distict.map((data, index) =>{
                    if ( values.state !== "") {
                      let state_obj = distict.find((state)=>state["district"]===values.state)
                      values.state_id = state_obj.id
                    }
                    return (<option key={index}>{data.district}</option>)
                  })}
              </select>
            </label>

          </SurveyInner>
          <SurveyInner mdTitle="Lütfen yaşını seç.">
            <label className="custom-select" htmlFor="styledSelect1">
              <select
                id="styledSelect1"
                name="age"
                value={values.age}
                type="select"
                onChange={handleChange}
              >
                 {ageList &&
                  ageList.map((data,index) => {
                    if ( values.age !== "") {
                      let id = ageList.indexOf(values.age)
                      values.age_id = id + 1
                    }
                    return (<option key={index}>{data}</option>  )
                  }
                  )}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner
            mdTitle="Cinsiyetini seç."
            nextButtonShow={false}
            prevButtonShow={false}
          >
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect2"
                name="gender"
                value={values.gender}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                {genderList &&
                  genderList.map((data,index) => {
                    if ( values.gender !== "") {
                      let id = genderList.indexOf(values.gender)
                      values.gender_id = id + 1
                    }
                    return (<option key={index}>{data}</option>  )
                  }
                  )}
              </select>
            </label>
          </SurveyInner>

          <SurveyInner
            mdTitle="Tatilini kiminle yapıyorsun?"
            nextButtonShow={false}
            prevButtonShow={false}
          >
            <label className="custom-select" htmlFor="styledSelect2">
              <select
                id="styledSelect3"
                name="group"
                value={values.group}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}></option>
                {groupList &&
                  groupList.map((data,index) => {
                    if ( values.group !== "") {
                      let id = groupList.indexOf(values.group)
                      values.group_id = id + 1
                    }
                    return (<option key={index}>{data}</option>  )
                  }
                  )}
              </select>
            </label>
          </SurveyInner>
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
                {transportationList &&
                  transportationList.map((data,index) => {
                    if ( values.transportation !== "") {
                      let id = transportationList.indexOf(values.transportation)
                      values.transportation_id = id + 1
                    }
                    return (<option key={index}>{data}</option>  )
                  }
                  )}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner>
            <h1>
              Hava şu an <span className="weather">{weather.weather}</span>{" "}
              <span className="temperature">{weather.temperature}°C</span>
            </h1>
          </SurveyInner>
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
                 {category &&
                  category.map((data) => {
                    if ( values.place3 !== "") {
                      let cat_obj = category.find((cat)=>cat["category"]===values.category)
                      values.category_id = cat_obj.id
                    }
                    return [(<option key={data.id}>{data.category}</option>)] 
                  })}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner mdTitle="Bu koşullar altında nereleri gezmek istersin?" />
        </SwiperSlide>

        <SwiperSlide>
          <SurveyInner
            title="1. Seçim"
            nextButtonShow={false}
            prevButtonShow={false}
          >
            
            <label className="custom-select" htmlFor="styledSelect5">
              <select
                id="styledSelect5"
                name="place1"
                value={values.place1}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}>
                  Lütfen bir mekan seçiniz.
                </option>
                {getplace &&
                  getplace.map((data) => {
                    if ( values.place1 !== "") {
                      let place = getplace.find((place)=>place["place_name"]===values.place1)
                      values.place1_id = place.id
                    }

                    return [(<option key={data.id} value={data["place_name"]} >{data["place_name"]}</option>)] 
                  }
                  )}
                  </select>
            </label>
          </SurveyInner>
          <SurveyInner
            title="2. Seçim"
            nextButtonShow={false}
            prevButtonShow={false}
          >
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place2"
                value={values.place2}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}>
                  Lütfen bir mekan seçiniz.
                </option>
                {getplace &&
                  getplace.map((data) => {
                    if ( values.place2 !== "") {
                      let place = getplace.find((place)=>place["place_name"]===values.place2)
                      values.place2_id = place.id
                    }
                    return [(<option key={data.id} value={data["place_name"]} >{data["place_name"]}</option>)] 
                  })}
              </select>
            </label>
          </SurveyInner>
          <SurveyInner
            title="3. Seçim"
            nextButtonShow={false}
            prevButtonShow={false}
          >
            <label className="custom-select" htmlFor="styledSelect6">
              <select
                id="styledSelect6"
                name="place3"
                value={values.place3}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}>
                  Lütfen bir mekan seçiniz.
                </option>
                {getplace &&
                  getplace.map((data) => {
                    if ( values.place3 !== "") {
                      let place = getplace.find((place)=>place["place_name"]===values.place3)
                      values.place3_id = place.id
                    }
                    return [(<option key={data.id} value={data["place_name"]} >{data["place_name"]}</option>)] 
                  })}
              </select>
            </label>
          </SurveyInner>
          <SurveyInner
            title="4. Seçim"
            nextButtonShow={false}
            prevButtonShow={false}
          >
            <label className="custom-select" htmlFor="styledSelect7">
              <select
                id="styledSelect6"
                name="place4"
                value={values.place4}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}>
                  Lütfen bir mekan seçiniz.
                </option>
                {getplace &&
                  getplace.map((data) => {
                    if ( values.place4 !== "") {
                      let place = getplace.find((place)=>place["place_name"]===values.place4)
                      values.place4_id = place.id
                    }
                    return [(<option key={data.id} value={data["place_name"]} >{data["place_name"]}</option>)] 
                  })}
              </select>
            </label>
          </SurveyInner>
          <SurveyInner title="5. Seçim">
            <label className="custom-select" htmlFor="styledSelect8">
              <select
                id="styledSelect5"
                name="place5"
                value={values.place5}
                type="select"
                onChange={handleChange}
              >
                <option style={{ display: "none" }}>
                  Lütfen bir mekan seçiniz.
                </option>
                {getplace &&
                  getplace.map((data) => {
                    if ( values.place5 !== "") {
                      let place = getplace.find((place)=>place["place_name"]===values.place5)
                      values.place5_id = place.id
                    }
                    return [(<option key={data.id} value={data["place_name"]} >{data["place_name"]}</option>)] 
                  })}
              </select>
            </label>
          </SurveyInner>
        </SwiperSlide>


        <SwiperSlide>
          <button form="myform" type="submit" className="submit-button">
            GÖNDER
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Survey;
