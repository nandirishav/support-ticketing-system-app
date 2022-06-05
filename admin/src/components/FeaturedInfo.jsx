import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo({ cardData }) {
  return (
    <div className="featured">
      {cardData.map((card, index) => {
        return (
          <div key={index} className="featuredItem">
            <span className="featuredTitle">{card.title}</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{card.money}</span>
            </div>
            <span className="featuredSub">{card.timeLine}</span>
          </div>
        );
      })}
    </div>
  );
}
