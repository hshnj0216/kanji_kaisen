"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { FaRotateRight } from "react-icons/fa6";

const RadicalSearch: FC = () => {

    const kanjiRadicals = [
        '一', '丨', '丶', '丿', '乙', '亅', '二', '亠', '人', '儿', '入', '八', '冂', '冖', '冫', '几',
        '凵', '刀', '力', '勹', '匕', '匚', '匸', '十', '卜', '卩', '厂', '厶', '又', '口', '囗', '土',
        '士', '夂', '夊', '夕', '大', '女', '子', '宀', '寸', '小', '尢', '尸', '屮', '山', '川', '工',
        '己', '巾', '干', '幺', '广', '廴', '廾', '弋', '弓', '彐', '彡', '彳', '心', '戈', '戶', '手',
        '支', '攴', '文', '斗', '斤', '方', '无', '日', '曰', '月', '木', '欠', '止', '歹', '殳', '毋',
        '比', '毛', '氏', '气', '水', '火', '爪', '父', '爻', '爿', '片', '牙', '牛', '犬', '玄', '玉',
        '瓜', '瓦', '甘', '生', '用', '田', '疋', '疒', '癶', '白', '皮', '皿', '目', '矛', '矢', '石',
        '示', '禸', '禾', '穴', '立', '竹', '米', '糸', '缶', '网', '羊', '羽', '老', '而', '耒', '耳',
        '聿', '肉', '臣', '自', '至', '臼', '舌', '舛', '舟', '艮', '色', '艸', '虍', '虫', '血', '行',
        '衣', '襾', '見', '角', '言', '谷', '豆', '豕', '豸', '貝', '赤', '走', '足', '身', '車', '辛',
        '辰', '辵', '邑', '酉', '釆', '里', '金', '長', '門', '阜', '隶', '隹', '雨', '青', '非', '面',
        '革', '韋', '韭', '音', '頁', '風', '飛', '食', '首', '香', '馬', '骨', '高', '髟', '鬥', '鬯',
        '鬲', '鬼', '魚', '鳥', '鹵', '鹿', '麥', '麻', '黃', '黍', '黑', '黹', '黽', '鼎', '鼓', '鼠',
        '鼻', '齊', '齒', '龍', '龜', '龠'
    ];

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
            <div className="w-full h-2/6 flex border-b-black">

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