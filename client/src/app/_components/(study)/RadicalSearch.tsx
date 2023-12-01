"use client";

import { FC, useState } from "react";

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

    const onRadicalClick = (item: string) => {
        if(selectedRadicals.has(item)) {
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
            
    return (
        <div className="bg-slate-300 p-3 border rounded absolute top-full z-10 w-full h- flex flex-wrap max-h-80 justify-center overflow-scroll">
            {kanjiRadicals.map((radical) => (
                <div key={radical}      
                    className={`border rounded bg-slate-50 p-1 m-1 cursor-pointer 
                                ${selectedRadicals.has(radical) ? "bg-slate-500" : ""}`}
                    onClick={() => onRadicalClick(radical)}
                >
                    {radical}
                </div>
            ))}
        </div>
    )
}

export default RadicalSearch;