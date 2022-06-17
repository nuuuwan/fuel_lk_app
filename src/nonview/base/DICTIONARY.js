const DICTIONARY = {
  "30 minutes to 3 hours": {
    si: "\u0dc0\u0dd2\u0db1\u0dcf\u0da9\u0dd2 30 \u0dc3\u0dd2\u0da7 \u0db4\u0dd0\u0dba 3 \u0daf\u0d9a\u0dca\u0dc0\u0dcf",
    ta: "30 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0bc1\u0ba4\u0bb2\u0bcd 3 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd \u0bb5\u0bb0\u0bc8",
  },
  "30mins - 3hrs": {
    si: "\u0db8\u0dd2\u0db1\u0dd2\u0dad\u0dca\u0dad\u0dd4 30 - \u0db4\u0dd0\u0dba 3 \u0dba\u0dd2",
    ta: "30 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd - 3 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0bae\u0bcd",
  },
  "< 30mins": {
    si: "< \u0dc0\u0dd2\u0db1\u0dcf\u0da9\u0dd2 30",
    ta: "< 30 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd",
  },
  "<1 Hr Ago": {
    si: "<\u0db4\u0dd0\u0dba 1 \u0d9a\u0da7 \u0db4\u0dd9\u0dbb",
    ta: "<1 \u0bae\u0ba3\u0bbf\u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bae\u0bc1\u0ba9\u0bcd\u0baa\u0bc1",
  },
  "<1 Week Ago": {
    si: "<\u0dc3\u0dad\u0dd2\u0dba\u0d9a\u0da7 \u0db4\u0dd9\u0dbb",
    ta: "<1 \u0bb5\u0bbe\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bae\u0bc1\u0ba9\u0bcd\u0baa\u0bc1",
  },
  "<12 Hrs Ago": {
    si: "<\u0db4\u0dd0\u0dba 12 \u0d9a\u0da7 \u0db4\u0dd9\u0dbb",
    ta: "<12 \u0bae\u0ba3\u0bbf\u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bae\u0bc1\u0ba9\u0bcd\u0baa\u0bc1",
  },
  "<24 Hrs Ago": {
    si: "<\u0db4\u0dd0\u0dba 24 \u0d9a\u0da7 \u0db4\u0dd9\u0dbb",
    ta: "<24 \u0bae\u0ba3\u0bbf\u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bae\u0bc1\u0ba9\u0bcd\u0baa\u0bc1",
  },
  "<3 Hrs Ago": {
    si: "<\u0db4\u0dd0\u0dba 3 \u0d9a\u0da7 \u0db4\u0dd9\u0dbb",
    ta: "<3 \u0bae\u0ba3\u0bbf\u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bae\u0bc1\u0ba9\u0bcd\u0baa\u0bc1",
  },
  "<6 Hrs Ago": {
    si: "<\u0db4\u0dd0\u0dba 6 \u0d9a\u0da7 \u0db4\u0dd9\u0dbb",
    ta: "<6 \u0bae\u0ba3\u0bbf\u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bae\u0bc1\u0ba9\u0bcd\u0baa\u0bc1",
  },
  "> 3hrs": {
    si: "> \u0db4\u0dd0\u0dba 3 \u0dba\u0dd2",
    ta: "> 3 \u0bae\u0ba3\u0bbf",
  },
  "All Fuels": {
    si: "\u0dc3\u0dd2\u0dba\u0dbd\u0dd4\u0db8 \u0d89\u0db1\u0dca\u0db0\u0db1",
    ta: "\u0b85\u0ba9\u0bc8\u0ba4\u0bcd\u0ba4\u0bc1 \u0b8e\u0bb0\u0bbf\u0baa\u0bca\u0bb0\u0bc1\u0bb3\u0bcd\u0b95\u0bb3\u0bcd",
  },
  "Any Diesel": {
    si: "\u0d95\u0db1\u0dd1\u0db8 \u0da9\u0dd3\u0dc3\u0dbd\u0dca",
    ta: "\u0b8f\u0ba4\u0bc7\u0ba9\u0bc1\u0bae\u0bcd \u0b9f\u0bc0\u0b9a\u0bb2\u0bcd",
  },
  "Any Petrol": {
    si: "\u0d95\u0db1\u0dd1\u0db8 \u0db4\u0dd9\u0da7\u0dca\u200d\u0dbb\u0dbd\u0dca",
    ta: "\u0b8e\u0ba8\u0bcd\u0ba4 \u0baa\u0bc6\u0b9f\u0bcd\u0bb0\u0bcb\u0bb2\u0bcd",
  },
  "Code - Data": {
    si: "\u0d9a\u0dda\u0dad\u0dba - \u0daf\u0dad\u0dca\u0dad",
    ta: "\u0b95\u0bc1\u0bb1\u0bbf\u0baf\u0bc0\u0b9f\u0bc1 - \u0ba4\u0bb0\u0bb5\u0bc1",
  },
  "Code - React App": {
    si: "\u0d9a\u0dda\u0dad\u0dba - \u0db4\u0dca\u0dbb\u0dad\u0dd2\u0d9a\u0dca\u0dbb\u0dd2\u0dba\u0dcf \u0dba\u0dd9\u0daf\u0dd4\u0db8",
    ta: "\u0b95\u0bc1\u0bb1\u0bbf\u0baf\u0bc0\u0b9f\u0bc1 - \u0bb0\u0bbf\u0baf\u0bbe\u0b95\u0bcd\u0b9f\u0bcd \u0b86\u0baa\u0bcd",
  },
  "Filter by Fuel Type": {
    si: "\u0d89\u0db1\u0dca\u0db0\u0db1 \u0dc0\u0dbb\u0dca\u0d9c\u0dba \u0d85\u0db1\u0dd4\u0dc0 \u0db4\u0dd9\u0dbb\u0dd3\u0db8",
    ta: "\u0b8e\u0bb0\u0bbf\u0baa\u0bca\u0bb0\u0bc1\u0bb3\u0bcd \u0bb5\u0b95\u0bc8 \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0bb5\u0b9f\u0bbf\u0b95\u0b9f\u0bcd\u0b9f\u0bb5\u0bc1\u0bae\u0bcd",
  },
  "Filter by Time Updated": {
    si: "\u0dba\u0dcf\u0dc0\u0dad\u0dca\u0d9a\u0dcf\u0dbd\u0dd3\u0db1 \u0d9a\u0dc5 \u0d9a\u0dcf\u0dbd\u0dba \u0d85\u0db1\u0dd4\u0dc0 \u0db4\u0dd9\u0dbb\u0db1\u0dca\u0db1",
    ta: "\u0baa\u0bc1\u0ba4\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f \u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0ba9\u0bcd\u0baa\u0b9f\u0bbf \u0bb5\u0b9f\u0bbf\u0b95\u0b9f\u0bcd\u0b9f\u0bb5\u0bc1\u0bae\u0bcd",
  },
  "Fuel in SL": {
    si: "\u0dc1\u0dca\u200d\u0dbb\u0dd3 \u0dbd\u0d82\u0d9a\u0dcf\u0dc0\u0dda \u0d89\u0db1\u0dca\u0db0\u0db1",
    ta: "SL \u0b87\u0bb2\u0bcd \u0b8e\u0bb0\u0bbf\u0baa\u0bca\u0bb0\u0bc1\u0bb3\u0bcd",
  },
  "Help (Twitter Thread)": {
    si: "\u0d8b\u0daf\u0dc0\u0dca (\u0da7\u0dca\u0dc0\u0dd2\u0da7\u0dbb\u0dca \u0db1\u0dd6\u0dbd\u0dca)",
    ta: "\u0b89\u0ba4\u0bb5\u0bbf (\u0b9f\u0bcd\u0bb5\u0bbf\u0b9f\u0bcd\u0b9f\u0bb0\u0bcd \u0ba8\u0bc2\u0bb2\u0bcd)",
  },
  "How long is the wait now?": {
    si: "\u0daf\u0dd0\u0db1\u0dca \u0d9a\u0ddc\u0db4\u0db8\u0dab \u0d9a\u0dcf\u0dbd\u0dba\u0d9a\u0dca \u0db6\u0dbd\u0dcf \u0dc3\u0dd2\u0da7\u0dd3\u0db8\u0daf?",
    ta: "\u0b87\u0baa\u0bcd\u0baa\u0bcb\u0ba4\u0bc1 \u0b8e\u0bb5\u0bcd\u0bb5\u0bb3\u0bb5\u0bc1 \u0ba8\u0bc7\u0bb0\u0bae\u0bcd \u0b95\u0bbe\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0baa\u0bcd\u0baa\u0bc1?",
  },
  "If you have voted multiple times, your latest vote will be selected.": {
    si: "\u0d94\u0db6 \u0d9a\u0dd2\u0dc4\u0dd2\u0db4 \u0dc0\u0dad\u0dcf\u0dc0\u0d9a\u0dca \u0da1\u0db1\u0dca\u0daf\u0dba \u0db4\u0dca\u200d\u0dbb\u0d9a\u0dcf\u0dc1 \u0d9a\u0dbb \u0d87\u0dad\u0dca\u0db1\u0db8\u0dca, \u0d94\u0db6\u0d9c\u0dda \u0db1\u0dc0\u0dad\u0db8 \u0da1\u0db1\u0dca\u0daf\u0dba \u0dad\u0ddd\u0dbb\u0dcf\u0d9c\u0db1\u0dd4 \u0dbd\u0dd0\u0db6\u0dda.",
    ta: "\u0ba8\u0bc0\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0baa\u0bb2\u0bae\u0bc1\u0bb1\u0bc8 \u0bb5\u0bbe\u0b95\u0bcd\u0b95\u0bb3\u0bbf\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0ba8\u0bcd\u0ba4\u0bbe\u0bb2\u0bcd, \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0b9a\u0bae\u0bc0\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0baf \u0bb5\u0bbe\u0b95\u0bcd\u0b95\u0bc1 \u0ba4\u0bc7\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0bc6\u0b9f\u0bc1\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0bae\u0bcd.",
  },
  Kerosene: {
    si: "\u0db7\u0dd6\u0db8\u0dd2\u0dad\u0dd9\u0dbd\u0dca",
    ta: "\u0bae\u0ba3\u0bcd\u0ba3\u0bc6\u0ba3\u0bcd\u0ba3\u0bc6\u0baf\u0bcd",
  },
  "Last Updated by Shed": {
    si: "\u0d85\u0dc0\u0dc3\u0db1\u0dca \u0dc0\u0dbb\u0da7 \u0dba\u0dcf\u0dc0\u0dad\u0dca\u0d9a\u0dcf\u0dbd\u0dd3\u0db1 \u0d9a\u0dbb\u0db1 \u0dbd\u0daf\u0dca\u0daf\u0dda Shed \u0dc0\u0dd2\u0dc3\u0dd2\u0db1\u0dd2",
    ta: "\u0b95\u0b9f\u0bc8\u0b9a\u0bbf\u0baf\u0bbe\u0b95 \u0bb7\u0bc6\u0b9f\u0bcd \u0bae\u0bc2\u0bb2\u0bae\u0bcd \u0baa\u0bc1\u0ba4\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1",
  },
  "Less than 30 minutes": {
    si: "\u0dc0\u0dd2\u0db1\u0dcf\u0da9\u0dd2 30\u0d9a\u0da7 \u0d85\u0da9\u0dd4\u0dba\u0dd2",
    ta: "30 \u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0b95\u0bc1\u0bb1\u0bc8\u0bb5\u0bbe\u0ba9\u0ba4\u0bc1",
  },
  "More than 3 hours": {
    si: "\u0db4\u0dd0\u0dba 3 \u0d9a\u0da7 \u0dc0\u0da9\u0dcf",
    ta: "3 \u0bae\u0ba3\u0bbf \u0ba8\u0bc7\u0bb0\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0bae\u0bc7\u0bb2\u0bbe\u0b95",
  },
  "Need more feedback": {
    si: "\u0dad\u0dc0\u0dad\u0dca \u0db4\u0dca\u200d\u0dbb\u0dad\u0dd2\u0db4\u0ddd\u0dc2\u0dab \u0d85\u0dc0\u0dc1\u0dca\u200d\u0dba\u0dba\u0dd2",
    ta: "\u0bae\u0bc7\u0bb2\u0bc1\u0bae\u0bcd \u0b95\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1 \u0ba4\u0bc7\u0bb5\u0bc8",
  },
  "No Fuel": {
    si: "\u0d89\u0db1\u0dca\u0db0\u0db1 \u0db1\u0dd0\u0dad",
    ta: "\u0b8e\u0bb0\u0bbf\u0baa\u0bca\u0bb0\u0bc1\u0bb3\u0bcd \u0b87\u0bb2\u0bcd\u0bb2\u0bc8",
  },
  "Not Sure or Don't Know": {
    si: "\u0dc0\u0dd2\u0dc1\u0dca\u0dc0\u0dcf\u0dc3 \u0db1\u0dd0\u0dad \u0dc4\u0ddd \u0db1\u0ddc\u0daf\u0db1\u0dd3",
    ta: "\u0b89\u0bb1\u0bc1\u0ba4\u0bbf\u0baf\u0bbe\u0b95 \u0ba4\u0bc6\u0bb0\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8 \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0ba4\u0bc6\u0bb0\u0bbf\u0baf\u0bbe\u0ba4\u0bc1",
  },
  "Not Sure/Don't Know": {
    si: "\u0dc0\u0dd2\u0dc1\u0dca\u0dc0\u0dcf\u0dc3 \u0db1\u0dd0\u0dad/\u0db1\u0ddc\u0daf\u0db1\u0dd3",
    ta: "\u0b89\u0bb1\u0bc1\u0ba4\u0bbf\u0baf\u0bbe\u0b95 \u0ba4\u0bc6\u0bb0\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8/\u0ba4\u0bc6\u0bb0\u0bbf\u0baf\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8",
  },
  "Opening Stock": {
    si: "\u0d9a\u0ddc\u0da7\u0dc3\u0dca \u0dc0\u0dd2\u0dc0\u0dd8\u0dad \u0d9a\u0dd2\u0dbb\u0dd3\u0db8",
    ta: "\u0ba4\u0bbf\u0bb1\u0baa\u0bcd\u0baa\u0bc1 \u0baa\u0b99\u0bcd\u0b95\u0bc1",
  },
  "Petrol-92": {
    si: "\u0db4\u0dd9\u0da7\u0dca\u0dbb\u0dbd\u0dca-92",
    ta: "\u0baa\u0bc6\u0b9f\u0bcd\u0bb0\u0bcb\u0bb2\u0bcd-92",
  },
  "Petrol-92 only": {
    si: "\u0db4\u0dd9\u0da7\u0dca\u200d\u0dbb\u0dbd\u0dca-92 \u0db4\u0db8\u0dab\u0dd2",
    ta: "\u0baa\u0bc6\u0b9f\u0bcd\u0bb0\u0bcb\u0bb2\u0bcd-92 \u0bae\u0b9f\u0bcd\u0b9f\u0bc1\u0bae\u0bc7",
  },
  "Petrol-95": {
    si: "\u0db4\u0dd9\u0da7\u0dca\u0dbb\u0dbd\u0dca-95",
    ta: "\u0baa\u0bc6\u0b9f\u0bcd\u0bb0\u0bcb\u0bb2\u0bcd-95",
  },
  "Petrol-95 only": {
    si: "\u0db4\u0dd9\u0da7\u0dca\u200d\u0dbb\u0dbd\u0dca-95 \u0db4\u0db8\u0dab\u0dd2",
    ta: "\u0baa\u0bc6\u0b9f\u0bcd\u0bb0\u0bcb\u0bb2\u0bcd-95 \u0bae\u0b9f\u0bcd\u0b9f\u0bc1\u0bae\u0bc7",
  },
  "Recent Community Feedback": {
    si: "\u0db8\u0dd1\u0dad \u0db4\u0dca\u200d\u0dbb\u0da2\u0dcf \u0db4\u0dca\u200d\u0dbb\u0dad\u0dd2\u0db4\u0ddd\u0dc2\u0dab",
    ta: "\u0b9a\u0bae\u0bc0\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0baf \u0b9a\u0bae\u0bc2\u0b95 \u0b95\u0bb0\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1",
  },
  "Recent Dispatch": {
    si: "\u0db8\u0dd1\u0dad \u0dba\u0dd0\u0dc0\u0dd3\u0db8",
    ta: "\u0b9a\u0bae\u0bc0\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0baf \u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa\u0bc1\u0ba4\u0bb2\u0bcd",
  },
  "Refresh App": {
    si: "\u0dba\u0dd9\u0daf\u0dd4\u0db8 \u0db1\u0dd0\u0dc0\u0dd4\u0db8\u0dca \u0d9a\u0dbb\u0db1\u0dca\u0db1",
    ta: "\u0baa\u0baf\u0ba9\u0bcd\u0baa\u0bbe\u0b9f\u0bcd\u0b9f\u0bc8\u0baa\u0bcd \u0baa\u0bc1\u0ba4\u0bc1\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd",
  },
  "Regular Diesel": {
    si: "\u0dc3\u0dcf\u0db8\u0dcf\u0db1\u0dca\u200d\u0dba \u0da9\u0dd3\u0dc3\u0dbd\u0dca",
    ta: "\u0bb5\u0bb4\u0b95\u0bcd\u0b95\u0bae\u0bbe\u0ba9 \u0b9f\u0bc0\u0b9a\u0bb2\u0bcd",
  },
  "Regular Diesel only": {
    si: "\u0dc3\u0dcf\u0db8\u0dcf\u0db1\u0dca\u200d\u0dba \u0da9\u0dd3\u0dc3\u0dbd\u0dca \u0db4\u0db8\u0dab\u0dd2",
    ta: "\u0bb5\u0bb4\u0b95\u0bcd\u0b95\u0bae\u0bbe\u0ba9 \u0b9f\u0bc0\u0b9a\u0bb2\u0bcd \u0bae\u0b9f\u0bcd\u0b9f\u0bc1\u0bae\u0bc7",
  },
  "Super-Diesel": {
    si: "\u0dc3\u0dd4\u0db4\u0dd2\u0dbb\u0dd2 \u0da9\u0dd3\u0dc3\u0dbd\u0dca",
    ta: "\u0b9a\u0bc2\u0baa\u0bcd\u0baa\u0bb0\u0bcd \u0b9f\u0bc0\u0b9a\u0bb2\u0bcd",
  },
  "Super-Diesel only": {
    si: "\u0dc3\u0dd4\u0db4\u0dd2\u0dbb\u0dd2 \u0da9\u0dd3\u0dc3\u0dbd\u0dca \u0db4\u0db8\u0dab\u0dd2",
    ta: "\u0b9a\u0bc2\u0baa\u0bcd\u0baa\u0bb0\u0bcd \u0b9f\u0bc0\u0b9a\u0bb2\u0bcd \u0bae\u0b9f\u0bcd\u0b9f\u0bc1\u0bae\u0bc7",
  },
  "fuel.gov.lk": {
    si: "\u0d89\u0db1\u0dca\u0db0\u0db1.gov.lk",
    ta: "\u0b8e\u0bb0\u0bbf\u0baa\u0bca\u0bb0\u0bc1\u0bb3\u0bcd.gov.lk",
  },
};
export default DICTIONARY;
