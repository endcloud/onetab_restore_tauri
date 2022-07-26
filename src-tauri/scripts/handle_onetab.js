const {promises: {writeFile, mkdir}} = require('fs');
const {Level} = require('level')
const MongoClient = require('mongodb').MongoClient

const USER_HOME = (process.env.HOME || process.env.USERPROFILE).replaceAll("\\", "/")

const chrome = {
    name: "Google/Chrome",
    uuid: "chphlpgkkbolifaimnlloiipkdnihall"
}
const edge = {
    name: "Microsoft/Edge", // Edge || Edge Beta || Edge Dev || Edge Canary
    uuid: "hoimpamkkoehapgenciaoajfkfkpgfop"
}
// const firefox = "" // 火狐的扩展和目录结构与以上两位好兄弟不太一样, 无使用经验, 请自行修改

const winPath = `${USER_HOME}/AppData/Local/${edge.name}/User Data/Default/Local Extension Settings/${edge.uuid}`
// 以下两条为 Copilot 智能添加的代码, 请自行核对路径是否正确
// const macPath = `${USER_HOME}/Library/Application Support/${edge.name}/User Data/Default/Local Extension Settings/${edge.uuid}`
// const linuxPath = `${USER_HOME}/AppData/Local/${edge.name}/User Data/Default/Local Extension Settings/${edge.uuid}`

const ldb = new Level(winPath)
const url = "mongodb://alpha:123456aB@localhost:27017/?authSource=admin"

// 异步读取onetab的leveldb中的数据
const getOnetabData = async () => {
    await ldb.open()
    const str = await ldb.get('state')
    return JSON.parse(JSON.parse(str))
}

// 异步处理数据, 获得一个每条记录的数组
const getItems = async (onetabs) => {
    const items = []
    onetabs.forEach((ele, index) => {
        console.log(ele.id)
        ele.tabsMeta.map(ele => items.push(ele))
    })
    return items
}

// 异步连接mongo
const getMongoDB = async () => {
    const db = await MongoClient.connect(url)
    return await db
}

// 异步写入tab组
const insertGroups = async (db, onetabs) => {
    const dbo = await db.db("onetab")
    await dbo.collection("onetab_groups").insertMany(onetabs)
}

// 异步写入每条onetab记录
const insertItems = async (db, items) => {
    const dbo = db.db("onetab")
    await dbo.collection("onetab_items").insertMany(items)
}

// 生成用于备份的json数据文件和方便查看的CSV文件
const genExtFiles = async (items, onetabs) => {
    /*
     * 生成表头，\ufeff 是防止乱码
     * csv中以 `,` 换列，`\n`换行
     */
    let title = Object.keys(items[1])
    let csvContent = '\ufeff' + title.join(',') + '\n'

    // 添加表体
    items.forEach((item, index) => {
        let c = Object.values(item).join(',') + '\n'
        csvContent += c
    })
    // 生成文件夹
    await mkdir('onetab')

    // 生成csv文件
    await writeFile('./onetab/tab_items.csv', csvContent)

    // 生成JSON
    await writeFile('./onetab/tab_ori.json', JSON.stringify(onetabs))
    console.log('数据文件生成完毕, 请打开当前目录下的onetab文件夹查看.')
}

// 主函数
const main = async () => {
    const json = await getOnetabData()
    const db = await getMongoDB()
    const items = await getItems(json.tabGroups)
    await insertItems(db, items)
    await insertGroups(db, json.tabGroups)
    await genExtFiles(items, json)

    await db.close()
    console.log("写入MongoDB完成, 程序执行完毕. ")
}

main()
