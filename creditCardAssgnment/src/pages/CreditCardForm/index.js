import "./index.scss";
import React, { useState } from "react";
import CreditCard from "../../components/CreditCard/creditCard";
import {
  DEFAULT_CARD_FORMAT,
  DEFAULT_CVC_LENGTH,
  DEFAULT_CARD_LENGTH,
} from "../../utils/cardTypes";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { months } from "../../utils/monthsAndYears";
const { Option } = Select;
const CARD_NUMBER_TEXT = "################";
const FULL_NAME = "FULL NAME";

const CreditCardForm = () => {
  const [cvv, setCvv] = useState("");
  const [year, setYear] = useState("YY");
  const [month, setMonth] = useState("MM");
  const [name, setName] = useState(FULL_NAME);
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberText, setCardNumberText] = useState(CARD_NUMBER_TEXT);
  const [flip, setFlip] = useState(false);
  return (
    <div className="credit-card-form-parent">
      <div className="credit-card-form">
        <div className="credit-card-section">
          <CreditCard
            {...{ year, cvv, month, name, cardNumber, cardNumberText, flip }}
          />
        </div>
        <div className="form-section">
          <Form layout="vertical">
            <Form.Item label="Card Number">
              <Input
                onFocus={() => {
                  setFlip(false);
                }}
                type="tel"
                maxLength={DEFAULT_CARD_LENGTH}
                pattern={DEFAULT_CARD_FORMAT}
                onChange={(e) => {
                  setCardNumber(e.target.value);
                  setCardNumberText(
                    e.target.value.concat(CARD_NUMBER_TEXT).slice(0, 16)
                  );
                }}
              />
            </Form.Item>
            <Form.Item label="Card Name">
              <Input
                onChange={(e) => {
                  if (!e.target.value) setName(FULL_NAME);
                  else setName(e.target.value);
                }}
                onFocus={() => {
                  setFlip(false);
                }}
              />
            </Form.Item>
            <div className="form-bottom-portion">
              <div className="month-portion">
                <div style={{ fontSize: "12px" }}>Expiration Date</div>
                <Select
                  onFocus={() => {
                    setFlip(false);
                  }}
                  placeholder="Month"
                  style={{ paddingTop: "8px" }}
                  onChange={(value) => {
                    if (value && value < 10) setMonth(`0${value}`);
                    else setMonth(value);
                  }}
                >
                  {months.map((value) => {
                    return <Option value={value}>{value}</Option>;
                  })}
                </Select>
              </div>
              <DatePicker
                picker="year"
                placeholder="Year"
                onChange={(date, dateString) => {
                  if (!dateString) setYear("YY");
                  else setYear(dateString);
                }}
                onFocus={() => {
                  setFlip(false);
                }}
              />
              <Form.Item label="CVV" name="CVV">
                <Input
                  style={{ width: "100px" }}
                  maxLength={DEFAULT_CVC_LENGTH}
                  type="text"
                  onChange={(e) => setCvv(e.target.value)}
                  value={cvv}
                  onFocus={() => {
                    setFlip(true);
                  }}
                />
              </Form.Item>
            </div>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
