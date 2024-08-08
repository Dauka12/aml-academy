import React, { useEffect, useState } from 'react';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import axios from 'axios';
import { useStyle } from "../../components/VisualModal/StyleContext";
import base_url from '../../settings/base_url';
import './style.scss';


function ProfilePassword(props) {
  const { styles, checkStyle, userEntry } = useStyle();
  const [imagesHidden, setImagesHidden] = useState(false);
  const letterInterval = "standard";

  const fontSizes = {
    small: {
      fontSize: "15px",
      lineHeight: "17px",
      caption: { fontSize: "18px", lineHeight: "20px" },
      subtitle: { fontSize: "14px", lineHeight: "16px" },
    },
    standard: {
      fontSize: "16px",
      lineHeight: "18px",
      caption: { fontSize: "26px", lineHeight: "28px" },
      subtitle: { fontSize: "18px", lineHeight: "20px" },
    },
    large: {
      fontSize: "24px",
      lineHeight: "26px",
      caption: { fontSize: "32px", lineHeight: "34px" },
      subtitle: { fontSize: "22px", lineHeight: "24px" },
    },
  };
  useEffect(() => {
    if (!checkStyle) return;
    console.log(userEntry);
    if (userEntry) return;

    const textContentElement = document.querySelectorAll(".text-content");
    const size = styles.fontSize;
    setImagesHidden(!styles.showImage);

    if (textContentElement) {
      textContentElement.forEach((item) => {
        switch (size) {
          case "small":
          case "large":
            // Use specified size for small and large modes
            item.style.fontSize = fontSizes[size].fontSize;
            item.style.lineHeight = fontSizes[size].lineHeight;

            // Adjust size for caption and subtitle in small and large modes
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            }
            break;

          case "standard":
            // Use different sizes for different elements in standard mode
            if (item.classList.contains("caption")) {
              item.style.fontSize = fontSizes[size].caption.fontSize;
              item.style.lineHeight = fontSizes[size].caption.lineHeight;
            } else if (item.classList.contains("subtitle")) {
              item.style.fontSize = fontSizes[size].subtitle.fontSize;
              item.style.lineHeight = fontSizes[size].subtitle.lineHeight;
            } else {
              // Default size for other elements
              item.style.fontSize = fontSizes[size].fontSize;
              item.style.lineHeight = fontSizes[size].lineHeight;
            }
            break;

          default:
            break;
        }
      });
    }
  }, [checkStyle, userEntry, styles, setImagesHidden, fontSizes]);

  const getLetterSpacing = (interval) => {
    interval = styles.letterInterval;

    switch (interval) {
      case "medium":
        return "2px";
      case "large":
        return "4px";
      default:
        return "1px";
    }
  };
  useEffect(() => {
    const textContentElement = document.querySelector(".text-content");
    const family = styles.fontFamily;

    if (family) {
      textContentElement.style.fontFamily = family;
    }
  }, []);

  const [isEdit, setEdit] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');

  const [data, setData] = useState(null);

  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/aml/auth/userInfo`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          setData(response.data);
        } else {
          // console.log(response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isEdit]);

  const handleSaveChanges = async () => {
    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    };

    setPasswordMismatchError(false);

    const params = {
      "user_id": data.user_id,
      "lastname": data.lastname,
      "firstname": data.firstname,
      "patronymic": data.patronymic,
      "email": data.email,
      "password": password,
    };

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const res = await axios.patch(`${base_url}/api/aml/auth/change_user`, params, options);

      // console.log('changed password response ', res);
    } catch (error) {
      console.error(error);
    }

    setPassword('');
    setConfirmPassword('');
    setEdit(false)
  }

  const handleCancelChanges = () => {
    setEdit(false);
    setPassword('');
    setConfirmPassword('');
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
  }

  const handlePasswordConfirmChange = (password) => {
    setConfirmPassword(password)
  }

  return (
    <div className="profile-password text-content"
      style={{
        background: styles.colorMode === "dark" ? "#000" : styles.colorMode === "light" ? "#fff" : styles.colorMode === "blue" ? "#9dd1ff" : "#000",
        letterSpacing: getLetterSpacing(letterInterval)
      }}
    >
      <div className="title"
        style={{
          color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
        }}
      >Сменить пароль</div>
      <div className="fields"
        style={{
          color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
        }}
      >
        <InputField
          style={{
            color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
            letterSpacing: getLetterSpacing(letterInterval)
          }}
          value={password}
          isPassword={true}
          isEdit={isEdit}
          name={'password'}
          label={'Новый пароль'}
          hint={'Введите новый пароль'}
          handleChange={handlePasswordChange} />
        <InputField
          style={{
            color: styles.colorMode === "dark" ? "#fff" : styles.colorMode === "light" ? "#343434" : styles.colorMode === "blue" ? "#063462" : "#000",
            letterSpacing: getLetterSpacing(letterInterval)

          }}
          value={confirmPassword}
          isPassword={true}
          isEdit={isEdit}
          name={'confirmPassword'}
          label={'Повторите пароль'}
          hint={'Введите повторно пароль'}
          handleChange={handlePasswordConfirmChange} />
      </div>

      {
        passwordMismatchError
          ? (
            <div className="error">
              <h3>* Пароли не совпадают</h3>
            </div>
          ) : null
      }

      <div className="actions">
        {
          !isEdit
            ? (
              <div
                className={`redact`}
                onClick={() => setEdit(true)}
              >
                Изменить
              </div>
            )
            : (
              <>
                <div
                  className={`save`}
                  onClick={() => handleSaveChanges()}
                >
                  Сохранить
                </div>
                <div
                  className={`cancel`}
                  onClick={() => handleCancelChanges()}
                >
                  Отменить
                </div>
              </>
            )
        }
      </div>
    </div>
  );
}

const InputField = ({
  name,
  label,
  value,
  hint,
  isPassword,
  handleChange,
  isEdit,
  style
}) => {

  const [showPassword, setShowPassword] = useState(
    isPassword
  );

  let _value = value;

  return (
    <div className='field'
    >
      <label className='text-content'
        htmlFor={name}>{label}</label>
      <div>
        <input
          disabled={!isEdit}
          placeholder={hint}
          value={_value}
          type={showPassword
            ? 'password'
            : 'text'}
          name={name}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
          style={style}
        />

        {isPassword
          ? (
            <div className='show-password'>
              {
                showPassword ?
                  <AiFillEye style={{ cursor: 'pointer' }} size={23} onClick={() => {
                    setShowPassword(prev => !prev)
                  }} />
                  :
                  <AiFillEyeInvisible style={{ cursor: 'pointer' }} size={23} onClick={() => {
                    setShowPassword(prev => !prev)
                  }} />
              }
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default ProfilePassword;