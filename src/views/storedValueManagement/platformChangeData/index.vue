<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <div class="select_tool">
          <!-- 搜索 -->
          <el-select
            v-model="query.gamecode"
            clearable
            size="small"
            placeholder="全部游戏查询"
            class="filter-item"
            style="width: 150px"
            @change="crud.toQuery"
          >
            <el-option
              v-for="item in gameItemList"
              :key="item.key"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-input
            v-model="query.orderId"
            clearable
            placeholder="订单号"
            style="width: 100px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.passport"
            clearable
            placeholder="passport"
            style="width: 110px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.oteherid"
            clearable
            placeholder="passport"
            style="width: 180px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-date-picker
            v-model="query.crtime"
            :default-time="['00:00:00', '23:59:59']"
            type="daterange"
            range-separator=":"
            size="small"
            class="date-item"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-input
            v-model="query.regip"
            clearable
            placeholder="lunplay订单号"
            style="width: 180px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.packageName"
            clearable
            placeholder="包名"
            style="width: 200px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />

          <el-select
            v-model="query.status"
            clearable
            size="small"
            placeholder="状态"
            class="filter-item"
            style="width: 120px"
            @change="crud.toQuery"
          >
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.type"
              :value="item.id"
            />
          </el-select>
        </div>
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%"
        @selection-change="crud.selectionChangeHandler"
        @row-dblclick="doubleClick"
      >
        <el-table-column type="selection" width="60" />

        <el-table-column align="center" prop="gmid" label="序号" width="65px" />
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="85px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="roleid"
          label="用户id"
          width="200px"
        />
        <el-table-column
          align="center"
          prop="orderId"
          label="lp订单号"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="gamecode"
          label="游戏代码"
          width="100px"
        />
        <el-table-column
          align="center"
          prop="servercode"
          label="游戏服代码"
          width="100px"
        />
        <el-table-column
          align="center"
          prop="lpoint"
          label="储值L点"
          width="80px"
        />
        <el-table-column
          align="center"
          prop="gamepiont"
          label="储值游戏币"
          width="100px"
        />
        <el-table-column
          align="center"
          prop="roleid"
          label="角色id"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="registerdate"
          label="储值时间"
          width="140px"
        />
        <el-table-column
          align="center"
          prop="packageName"
          label="游戏包"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="userIp"
          label="ip"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="deviceInformation"
          label="用户国家"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="param"
          label="param"
          width="80px"
        />
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import { gamePointPaygame } from '@/api/gamePointPaygame'
import { getAll } from '@/api/gameRoom'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

const defaultForm = {
  id: null,
  gamecode: null,
  servercode: null,
  roleid: null,
  passport: null,
  packagename: null,
  content: null,
  imageArray: null,
  qusType: null,
  type: null,
  language: null,
  os: null,
  deviceInformation: null,
  deviceVersion: null,
  createtime: null,
  ipaddress: null,
  country: null,
  ansStatus: null,
  delStatus: null
}
export default {
  name: 'CusQuestionList',
  components: { pagination, crudOperation, rrOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  // 数据字典
  dicts: ['cus_delstatus', 'cus_status', 'cus_kr_desc'],
  cruds() {
    return CRUD({
      title: '平台储值兑换流水',
      url: 'api/gamePointPaygame',
      sort: 'gmid',
      crudMethod: { ...gamePointPaygame }
    })
  },
  data() {
    return {
      isShow: false,
      isShowDelg: false,
      isPlayVideo: false,
      isShowOtherType: true,
      checkedSel: false,
      inputContent: '',
      timer: null,
      getMsg: '',
      getDefualDate: null,
      getLastDate: null,
      isSendMsg: true,
      activeIndex: '1',
      defaultTime: [],
      valuenum: null,
      scopeData: {
        id: null,
        status: null,
        passport: null,
        username: null,
        lunplay_orderID: null,
        money: null,
        productID: null,
        serverCode: null,
        payGame_lpoint: null,
        time: null,
        packageName: null,
        siteCode: null,
        ipAddress: null,
        country: null,
        pay_tag: null,
        Lpoint: null,
        gameCode: null,
        transactionID: null,
        roleid: null
      },
      permission: {
        add: ['admin', 'cusQuestionList:add'],
        edit: ['admin', 'cusQuestionList:edit'],
        del: ['admin', 'cusQuestionList:del']
      },
      rules: {
        ansStatus: [
          { required: true, message: '回复状态不能为空', trigger: 'blur' }
        ],
        delStatus: [
          { required: true, message: '是否删除状态不能为空', trigger: 'blur' }
        ]
      },
      gameItemList: [],
      statusList: [
        { id: 1, type: '成功' },
        { id: 2, type: '失败' }
      ],
      gameOptions: [],
      qusTypeOptions: [],
      ansStatusOptions: [],
      delStatusOptions: [],
      oContent: {},
      msgs: [],
      serviceValue: ''
    }
  },
  created: function() {
    this.getAllGame()
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    getAllGame() {
      getAll().then((res) => {
        res.forEach((item) => {
          this.gameItemList.push(item.gamecode)
        })
      })
    },

    prviewVideo(data) {
      this.isPlayVideo = true
      this.getVideo = data
    },
    closeVideo() {
      var closeVideo = document.querySelector('.video')
      closeVideo.pause()
    },
    getServiceValue() {
      console.log(this.serviceValue)
      this.serviceValue = ''
      this.isShowDelg = !this.isShowDelg
    },
    clearValue() {
      this.serviceValue = ''
    },

    getDate() {
      this.getDefualDate = this.LastparseTimes(new Date())
      this.getLastDate = this.parseTimes(new Date())
      this.defaultTime.push(this.getLastDate)
      this.defaultTime.push(this.getDefualDate)
    },
    doubleClick(row) {
      this.isShowDelg = !this.isShowDelg
    },
    changeDelete(data) {
      console.log(data)
    },
    chnageRoides() {
      console.log('cuihua')
    },
    getInputNum(value) {
      this.valuenum = value.length
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .crud-opts {
//   // display: none;
// }
/deep/ .crud-opts-left {
  display: none;
}
/deep/ .cell {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/deep/ .el-dialog {
  margin-top: 5vh;
}

.serviceSel {
  float: right;
}

.changeRed {
  color: red;
}

.demo-image__preview {
  overflow: auto;
}

.el-form-item {
  margin-bottom: 5px;
}

.el-image {
  margin-left: 10px;
  margin-bottom: 10px;
}

.clearfix {
  *zoom: 1;
}
.clearfix::before {
  display: table;
  content: " ";
}
.clearfix::after {
  clear: both;
  display: table;
  content: " ";
}
.userinfo {
  width: 100%;
  height: 150px;
  display: flex;
  .userinfo-left {
    flex: 1;
  }
  .userinfo-center {
    flex: 1;
  }
  .userinfo-right {
    flex: 1;
  }
  .userinfo-top {
    flex: 1;
  }
}
.showMsg {
  position: absolute;
  top: 22px;
  left: 110px;
  font-size: 18px;
  color: red;
  font-weight: 600;
}
.el-dialog__body {
  padding: 0px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.sockTip {
  width: 100%;
  height: 300px;
  .chartContent {
    width: 100%;
    height: 250px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
    overflow: auto;
    .content {
      width: 100%;
      border-radius: 5px;
      .left-content {
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .msg-date {
          text-align: center;
          color: gray;
          font-size: 16px;
          padding-left: 16px;
        }
        .usercontent {
          float: left;
          word-wrap: break-word;
          word-break: break-all;
          margin-left: 10px;
          margin-top: 5px;
          background-color: #fff;
          width: 75%;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 16px;
        }
        .left-start {
          padding-left: 17px;
        }
      }
      .right-content {
        padding: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .msg-date {
          text-align: center;
          color: gray;
          font-size: 16px;
          padding-right: 18px;
        }
        .servicecontent {
          word-wrap: break-word;
          word-break: break-all;
          margin-right: 10px;
          margin-top: 5px;
          color: #fff;
          background-color: green;
          width: 75%;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 16px;
          font-family: "Courier New", Courier, monospace;
        }
        .right-start {
          padding-right: 20px;
        }
      }
    }
  }
}
.chatting-input {
  display: flex;
  height: 40px;
  width: 100%;
  margin-top: 12px;
  .el-input {
    flex: 1;
    padding-left: 10px;
    // padding-top: 10px;
    height: 100%;
    font-size: 18px;
  }
  button {
    width: 90px;
    height: 33px;
    line-height: 8px;
    background-color: #2196f3;
    color: #fff;
    font-size: 18px;
  }
}
.serviceDel {
  position: absolute;
  top: 25px;
  right: 23px;
}
</style>
