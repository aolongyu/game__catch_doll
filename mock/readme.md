# 数据说明

## file: myWealth.json  盒币数、抓抓券数
{
   icons // 盒币数
   vouchers // 抓抓券数
}

## file: signData.json  签到数据
{
  status, // 当日是否签到(eg: 0未签到, 1已签到)
  day // 已签到天数
}

## file: achievementData.json  抓抓成就数据
{
  catchTimes // 抓取次数(>=0)
  details: [{ // 每个阶段详情
      complete // 是否已完成(eg: 0:未完成, 1: 已完成)
      receive // 是否已领取(eg: 0:未领取, 1: 已领取)
    },
    {
      complete: 1,
      receive: 0
    },
    {
      complete: 0,
      receive: 0
    }
  ]
}

## file: wareHouse.json  仓库数据
{
  name: "100盒币100盒币100盒币",
  getDate: "11.21",
  status: 0 // 状态(eg: 0:已获得, 1:获得的游币将在10个工作日到账, 2:地址已填写, 3:QQ号已填写, 4:快去填写地址, 5:填写QQ号, 6:其他 )
}