import { Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function FeaturedInfo({ cardCount, cardData }) {
  const navigate = useNavigate();
  const onCardClick = (type) => {
    navigate(`/getTickets/${type}`);
  };
  return (
    <div className="featured">
      {cardCount.map((card, index) => {
        return (
          <div
            key={index}
            className="featuredItem"
            onClick={() => onCardClick(card.type)}
          >
            <span className="featuredTitle">{card.type} Tickets</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{card.count}</span>
            </div>
            <div className="featuredSub">
              Just Updated <Update />
            </div>
          </div>
        );
      })}
    </div>
  );
}
