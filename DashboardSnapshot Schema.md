# DashboardSnapshot Schema

本文件定義 WebSocket 傳輸用的 DashboardSnapshot 資料結構。

1. WebSocket 每次傳輸必須為完整 DashboardSnapshot
2. Widget 以 type 作為型別識別
3. Block 僅負責排版與容器
4. Widget 僅負責內容呈現

---

## 1. DashboardSnapshot（最外層）

```json
{
  "type": "DASHBOARD_SNAPSHOT",
  "version": 1,
  "timestamp": 1730000000000,
  "layout": {},
  "theme": {},
  "blocks": []
}
```
| 欄位      | 型別   | 必填 | 說明                               |
| --------- | ------ | ---- | ---------------------------------- |
| type      | string | 是   | 固定值 `"DASHBOARD_SNAPSHOT"`      |
| version   | number | 是   | Schema 版本                        |
| timestamp | number | 是   | Snapshot 產生時間（Unix time, ms） |
| layout    | object | 是   | Dashboard 整體排版設定             |
| theme     | object | 否   | 全局樣式設定                       |
| blocks    | array  | 是   | Block 清單                         |

## 2. Dashboard Layout
``` json
{
  "columns": 3,
  "gap": 16
}
```
| 欄位    | 型別   | 必填 | 說明           |
| ------- | ------ | ---- | -------------- |
| columns | number | 是   | Dashboard 欄數 |
| gap     | number | 是   | 欄間距（px）   |

## 3. Theme
``` json
{
  "blockBorder": {
    "color": "#444444",
    "width": 2
  },
  "chartColors": {
    "bar": "#4e79a7",
    "line": "#e15759"
  }
}
```
| 欄位        | 型別   | 必填 | 說明               |
| ----------- | ------ | ---- | ------------------ |
| blockBorder | object | 否   | Block 預設邊框樣式 |
| chartColors | object | 否   | Chart 預設顏色     |

## 4. Block
``` json
{
  "id": "block-id",
  "span": 3,
  "layout": {},
  "border": {},
  "widgets": []
}
```
| 欄位    | 型別   | 必填 | 說明                    |
| ------- | ------ | ---- | ----------------------- |
| id      | string | 是   | Block 唯一識別          |
| span    | number | 是   | Block 佔 Dashboard 欄數 |
| layout  | object | 否   | Block 內部排版          |
| border  | object | 否   | Block 邊框樣式          |
| widgets | array  | 是   | Widget 清單             |

## 5. Block Layout（Block 內排版）
``` json
{
  "columns": 2,
  "gap": 0
}
```
| 欄位    | 型別   | 必填 | 說明              |
| ------- | ------ | ---- | ----------------- |
| columns | number | 是   | Block 內欄數      |
| gap     | number | 是   | Widget 間距（px） |

## 6. Widget
Widget 透過 type 欄位區分型別。
```json
{ "type": "table", ... }
{ "type": "barLineChart", ... }
```

## 7. TableWidget
```json
{
  "type": "table",
  "title": "Table Title",
  "columns": [
    { "key": "field", "label": "Field Name" }
  ],
  "rows": [
    { "field": "value" }
  ]
}
```
| 欄位    | 型別   | 必填 | 說明             |
| ------- | ------ | ---- | ---------------- |
| type    | string | 是   | 固定值 `"table"` |
| title   | string | 否   | 表格標題         |
| columns | array  | 是   | 表頭定義         |
| rows    | array  | 是   | 表格資料列       |

| 欄位  | 型別   | 必填 | 說明          |
| ----- | ------ | ---- | ------------- |
| key   | string | 是   | 對應 row 欄位 |
| label | string | 是   | 顯示名稱      |

## 8. BarLineChartWidget
```json
{
  "type": "barLineChart",
  "title": "Chart Title",
  "chart": {
    "labels": ["10:00", "10:05"],
    "datasets": [
      {
        "type": "line",
        "label": "Avg",
        "data": [65, 72],
        "color": "#e15759"
      },
	  {
        "type": "bar",
        "label": "Load",
        "data": [70, 80],
        "color": "#4e79a7"
      }
    ]
  }
}
```
| 欄位  | 型別   | 必填 | 說明                                     |
| ----- | ------ | ---- | ---------------------------------------- |
| type  | string | 是   | 固定值 `"barLineChart"`                  |
| title | string | 否   | 圖表標題                                 |
| chart | object | 是   | Chart 資料，dataset中的順序會影響z-index |

## 9. Chart Dataset
| 欄位  | 型別     | 必填 | 說明                |
| ----- | -------- | ---- | ------------------- |
| type  | string   | 是   | `"bar"` 或 `"line"` |
| label | string   | 是   | Dataset 名稱        |
| data  | number[] | 是   | 數值資料            |
| color | string   | 否   | Dataset 顏色        |

## 10. BorderStyle
```json
{
  "color": "#cccccc",
  "width": 2
}
```
