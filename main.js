(function () {
  "use strict";

  const shops = [
    {
      id: 1292273001,
      name: "매콤돈가스&칡불냉면 판교점",
      lat: 37.40189834738935,
      lng: 127.10624455094185,
    },
    {
      id: 1151112822,
      name: "탄탄면공방 판교테크노밸리점",
      lat: 37.40193038525563,
      lng: 127.11060980539878,
    },
    {
      id: 15775065,
      name: "파리바게뜨 판교테크노점",
      lat: 37.40133360873933,
      lng: 127.10801128231743,
    },
  ];

  //지도의 중심좌표.
  const defaultPos = {
    lat: 37.4020589,
    lng: 127.1064401,
  };

  const get = (target) => {
    return document.querySelector(target);
  };

  const $map = get("#map");
  const geoLocationButton = get(".geolocation_button");

  var mapContainer = new kakao.maps.Map(map, {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(defaultPos.lat, defaultPos.lng),
    level: 3, //지도의 레벨(확대, 축소 정도)
  }); //지도 생성 및 객체 리턴

  const createMarkerImage = () => {
    const markerImgSrc = "marker.png";
    const imageSize = new kakao.maps.Size(30, 46); // 마커 이미지 크기 설정

    return new kakao.maps.MarkerImage(markerImgSrc, imageSize); // 마커 이미지 리턴으로 생성
  };

  // 좌표 생성해주기
  const createMarker = (lat, lng) => {
    const marker = new kakao.maps.Marker({
      map: mapContainer,
      position: new kakao.maps.LatLng(lat, lng), // 위도, 경도를 parameter값으로 받아 지정
      image: createMarkerImage(),
    });
    return marker;
  };

  const createShop = () => {
    shops.map((shop) => {
      // 배열을 map으로 순회
      const { lat, lng } = shop; // shop의 위도, 경도를 가지고 와준다
      const marker = createMarker(lat, lng);
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 2px;">
                  <a href="https://place.map.kakao.com/${shop.id}" target="_blank">${shop.name}</a>
                  </div>`,
      });
      infowindow.open(mapContainer, marker);
    });
  };

  const successGeolocation = (position) => {
    const { latitude, longitude } = position.coords;
    mapContainer.setCenter(new kakao.maps.LatLng(latitude, longitude));
    const marker = createMarker(latitude, longitude);
    marker.setMap(mapContainer);
  };

  const errorGeolocation = (error) => {
    if (error.code === 1) {
      alert("위치 정보를 허용해주세요.");
    } else if (error.code === 2) {
      alert("사용할 수 없는 위치입니다.");
    } else if (error.code === 3) {
      alert("타임아웃이 발생했습니다.");
    } else {
      alert("오류가 발생했습니다.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successGeolocation,
        errorGeolocation
      );
    } else {
      alert("지도 api 사용 불가");
    }
  };

  const init = () => {
    geoLocationButton.addEventListener("click", () => {
      getLocation();
    });
    createShop();
  };

  init();
})();
