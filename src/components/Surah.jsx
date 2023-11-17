import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Surah() {
  let { surah } = useParams();

  const [surahs, setSurahs] = useState([]);
  const [arabicSurahName, setArabicSurahName] = useState("");
  const [surahNumber, setSurahNumber] = useState();
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    fetch(`//api.alquran.cloud/v1/surah`)
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  useEffect(() => {
    surahs.map((surahName) => {
      if (surahName.englishName === surah) {
        setArabicSurahName(surahName.name);
        setSurahNumber(surahName.number);
      }
    });

    if (surahNumber) {
      setAyahs([]);
      fetch(`//api.alquran.cloud/v1/surah/${surahNumber}`)
        .then((res) => res.json())
        .then((data) => {
          data.data.ayahs ? setAyahs([...data.data.ayahs]) : false;
        });
    }
  }, [surahs, surahNumber, surah]);

  return (
    <>
      {/* <audio
        controls
        className="w-full container fixed left-1/2 -translate-x-1/2 bottom-0"
      >
        <source
          src={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`}
          type="audio/mp3"
        />
      </audio> */}

      <div className="py-3 md:px-10 px-3 text-primary-white">
        <div className="flex justify-around gap-3 items-center pt-2">
          <div className="text-center text-sm">رقم السورة: {surahNumber}</div>
          <h1 className="text-4xl text-center">{arabicSurahName}</h1>
          <span className="text-sm">عدد الآيات: {ayahs.length}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-6">
          {ayahs.length ? (
            <p className="leading-[60px] text-2xl">
              {ayahs.map((ayah) => {
                if (
                  ayah.text.includes(
                    `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`
                  ) &&
                  ayah.numberInSurah === 1
                ) {
                  return (
                    <>
                      <i className="block">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ
                      </i>
                      {`${
                        ayah.text.split(
                          `بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ`
                        )[1]
                      } ${`\u06DD${ayah.numberInSurah}`} `}
                    </>
                  );
                }
                return `${ayah.text} ${`\u06DD${ayah.numberInSurah}`} `;
              })}
            </p>
          ) : (
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="animate-spin text-4xl w-full text-center mt-20"
            />
          )}
        </div>
      </div>
    </>
  );
}
