import React from 'react';
import './featuredinfo.css';
import { ArrowDownward, ArrowUpward} from '@material-ui/icons';

export default function featuredinfo() {
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,415</span>
                <span className="featuredMoneyRate">
                    -11.4 <ArrowDownward/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,415</span>
                <span className="featuredMoneyRate">
                    -1.4 <ArrowDownward/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,415</span>
                <span className="featuredMoneyRate">
                    +2.4 <ArrowUpward/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,415</span>
                <span className="featuredMoneyRate">
                    +2.4 <ArrowUpward/>
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
    </div>
  )
}
