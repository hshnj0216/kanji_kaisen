"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { FaRotateRight } from "react-icons/fa6";

const RadicalSearch: FC = () => {

    const kanjiRadicals = {
        "1": ["一", "丨", "丶", "丿", "乙 ", "亅"],
        "2": ["二", "亠", "人 ", "儿", "入 ", "八 ", "冂", "冖", "冫", "几", "凵", "刀 ", "力", "勹", "匕", "匚", "十", "卜 ", "卩 ", "厂", "厶", "又", "亻", "𠆢", "丷", "マ", "九", "ユ", "乃", "刂"],
        "3": ["亡 ", "口", "囗", "土", "士", "夂", "夊", "夕", "大", "女", "子", "宀", "寸", "小 ", "尢 ", "尸", "屮", "山", "巛 ", "工", "已 ", "巾", "干", "幺", "广", "廴", "廾", "弋", "弓", "彐 ", "彡", "彳", "艹 ", "⻌ ", "邑 ", "阜 ", "⺌", "川", "彑", "也", "亡", "及", "久", "忄", "扌", "氵", "犭"],
        "4": ["心 ", "戈", "戸 ", "手 ", "支", "攵 ", "文", "斗", "斤", "方", "无 ", "日", "曰", "月 ", "木", "欠", "止", "歹 ", "殳", "毋 ", "比", "毛", "氏", "气", "水 ", "火 ", "爪 ", "父", "爻", "爿 ", "片", "牛 ", "犬 ", "王 ", "耂 ", "灬", "元", "井", "勿", "尤", "五", "屯", "巴", "礻"],
        "5": ["牙", "玄", "瓦", "甘", "生", "用 ", "田", "疋 ", "疒", "癶", "白", "皮", "皿", "目", "矛", "矢", "石", "示 ", "禸", "禾", "穴", "立", "罒 ", "衤", "世", "巨", "冊", "母"],
        "6": ["瓜", "竹 ", "米", "糸 ", "缶", "羊 ", "羽", "而", "耒", "耳", "聿 ", "肉 ", "自", "至", "臼", "舌", "舟", "艮", "色", "虍", "虫", "血", "行", "衣 ", "西 "],
        "7": ["臣", "舛", "見", "角", "言 ", "谷", "豆", "豕", "豸", "貝", "赤", "走 ", "足 ", "身", "車", "辛", "辰", "酉", "釆", "里", "麦 "],
        "8": ["金 ", "長 ", "門", "隶", "隹", "雨 ", "青 ", "非", "奄", "岡", "免", "斉"],
        "9": ["面 ", "革", "韭", "音", "頁", "風 ", "飛", "食 ", "首", "香", "品"],
        "10": ["韋", "馬", "骨", "高 ", "髟", "鬥", "鬯", "鬲", "鬼", "竜 "],
        "11": ["魚", "鳥", "鹵", "鹿", "麻", "黄 ", "黒 ", "亀 ", "啇"],
        "12": ["黍", "黹", "歯 ", "無"],
        "13": ["黽", "鼎", "鼓", "鼠"],
        "14": ["鼻", "齊"],
        "17": ["龠"]
    };
      

    const [selectedRadicals, setSelectedRadicals] = useState(new Set());
    const [matchingKanjis, setMatchingKanjis] = useState([]);

    const onRadicalClick = (item: string) => {
        //Manages the radicals state
        if (selectedRadicals.has(item)) {
            setSelectedRadicals(
                (prevSet) => {
                    const newSet = new Set(prevSet);
                    newSet.delete(item);
                    return newSet;
                }
            );
        } else {
            setSelectedRadicals((prevSet) => new Set(prevSet).add(item));
        }
    }

    const onResetTileClick = () => {
        setSelectedRadicals(new Set());
    }

    useEffect(() => {
        //Sends request
        async function getMatchingKanjis() {
            const radicals = Array.from(selectedRadicals).join(",");
            const serverUrl = `http://127.0.0.1:5000/studyData/kanjis/radicals/${radicals}`;
            const response = await axios.get(serverUrl);
            console.log(`response data: ${response.data}`);
            setMatchingKanjis(response.data);
        }
        getMatchingKanjis();
    }, [selectedRadicals]);

    return (
        <div className="bg-slate-300 p-3 border rounded absolute top-full z-10 w-full flex flex-wrap max-h-80 justify-center overflow-scroll">
            <div className="w-full h-2/6 flex border-b-black flex-wrap">
                {matchingKanjis?.map((kanji) => (
                    <div key={kanji.id} className="border p-2 m-1">
                        {kanji.kanji}
                    </div>
                ))}
            </div>
            <div className="w-full h-4/6 flex flex-wrap">
                <div className="border p-2 m-1 rounded bg-slate-500 flex items-center justify-center cursor-pointer"
                    title="Reset selected components"
                    onClick={onResetTileClick}
                >
                    <FaRotateRight />
                </div>
                {kanjiRadicals.map((radical) => (
                    <div key={radical}
                        className={`border rounded bg-slate-50 p-2 m-1 cursor-pointer 
                                    ${selectedRadicals.has(radical) ? "bg-slate-500" : ""}`}
                        onClick={() => onRadicalClick(radical)}
                    >
                        {radical}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RadicalSearch;