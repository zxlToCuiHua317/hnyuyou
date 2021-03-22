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
            v-model="query.id"
            clearable
            placeholder="游戏代码"
            style="width: 180px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
        </div>
        <el-button
          v-if="crud.optShow.download"
          :loading="crud.downloadLoading"
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-download"
          @click="addGameServerInfo()"
        >新增</el-button>
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
      <el-dialog
        :visible.sync="isShowDelg"
        width="1000px"
        top="1vh"
        height="95%"
        title="新增"
      >
        <el-form
          ref="form"
          :model="scopeData"
          :rules="rules"
          size="small"
          label-width="150px"
        >
          <el-form-item label="全部游戏查询">
            <el-select
              v-model="scopeData.gamecode"
              placeholder="全部游戏查询"
              style="width: 130px"
              @change="selectGameCode"
            >
              <el-option
                v-for="item in gameItemList"
                :key="item.key"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="服务器名">
            <el-input v-model="scopeData.servername" style="width: 80%" />
          </el-form-item>
          <el-form-item label="服务器代码">
            <el-input v-model="scopeData.servercode" style="width: 80%" />
          </el-form-item>
          <el-form-item label="经营类型">
            <template>
              <el-radio-group v-model="scopeData.opType">
                <el-radio label="own">自家经营</el-radio>
                <el-radio label="lianyin">联营</el-radio>
                <el-radio label="proxy">独家代理</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
          <el-form-item label="开服时间">
            <template>
              <el-date-picker
                v-model="scopeData.opentime"
                type="datetime"
                placeholder="选择日期时间"
              />
            </template>
          </el-form-item>
          <el-form-item v-if="isShow" label="充值开关">
            <el-radio v-model="scopeData.type" label="1">开</el-radio>
            <el-radio v-model="scopeData.type" label="2">关</el-radio>
          </el-form-item>
          <el-form-item v-if="isShow" label="登入开关">
            <el-radio v-model="scopeData.show" label="1">开</el-radio>
            <el-radio v-model="scopeData.show" label="2">关</el-radio>
          </el-form-item>
          <el-form-item label="充值域名">
            <el-input v-model="scopeData.paydomain" style="width: 80%" />
          </el-form-item>
          <el-form-item label="登入域名">
            <el-input v-model="scopeData.gamedomain" style="width: 80%" />
          </el-form-item>
          <el-form-item label="登录加密串">
            <el-input v-model="scopeData.loginKey" style="width: 80%" />
          </el-form-item>
          <el-form-item v-if="isShow" label="充值加密串">
            <el-input v-model="scopeData.payKey" style="width: 80%" />
          </el-form-item>
          <el-form-item label="获取角色加密串">
            <el-input v-model="scopeData.infoKey" style="width: 80%" />
          </el-form-item>
          <el-form-item v-if="isShow" label="所属地区">
            <el-select
              v-model="serviceValue"
              placeholder="所属地区"
              style="width: 130px"
            >
              <el-option
                v-for="item in gamePlatform"
                :key="item.id"
                :label="item.gamename"
                :value="item.gameplatform"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="isShow" label="是否推荐">
            <el-radio v-model="scopeData.show" label="1">是</el-radio>
            <el-radio v-model="scopeData.show" label="2">否</el-radio>
          </el-form-item>
          <el-form-item v-if="isShow" label="是否热门">
            <el-radio v-model="scopeData.show" label="1">是</el-radio>
            <el-radio v-model="scopeData.show" label="2">否</el-radio>
          </el-form-item>
          <el-form-item v-if="isShow" label="是否新服">
            <el-radio v-model="scopeData.show" label="1">是</el-radio>
            <el-radio v-model="scopeData.show" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="平台是否展示">
            <el-radio-group v-model="scopeData.isshow">
              <el-radio :label="0">关</el-radio>
              <el-radio :label="1">开</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeTip">取消</el-button>
          <el-button
            :loading="crud.cu === 2"
            type="primary"
            @click="getServiceValue"
          >确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="crud.loading"
        :data="crud.data"
        size="small"
        style="width: 100%"
        @selection-change="crud.selectionChangeHandler"
      >
        <el-table-column type="selection" width="60" />
        <el-table-column align="center" prop="id" label="序号" width="65px" />
        <el-table-column
          v-permission="['admin', 'cusQuestionList:edit']"
          label="操作"
          width="120px"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editGameServerInfo(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isShow"
          align="center"
          prop="gamecode"
          label="更新缓存"
          width="120px"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-refresh"
              @click="changeStatus(scope.row)"
            >更新缓存</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="gamecode"
          label="所属游戏"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="servername"
          label="服务器名"
          width="100px"
        />
        <el-table-column
          align="center"
          prop="servercode"
          label="服务器编码"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="opType"
          label="经营类型"
          width="120px"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.opType === 'own'">
              {{ '自家经营' }}
            </div>
            <div v-if="scope.row.opType === 'lianyin'">
              {{ '联营' }}
            </div>
            <div v-if="scope.row.opType === 'proxy'">
              {{ '独家代理' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="opentime"
          label="开服时间"
          width="200px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="pic1"
          label="充值开关"
          width="100px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="pic2"
          label="入口开关"
          width="120px"
        />
        <el-table-column
          align="center"
          prop="isshow"
          label="平台展示"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="paydomain"
          label="充值域名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="gamedomain"
          label="登入域名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="loginKey"
          label="登录加密串"
          width="150px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="pic3"
          label="充值加密串"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="infoKey"
          label="获取角色加密串"
          width="150px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="pic4"
          label="所属地区"
          width="150px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="pic5"
          label="是否推荐"
          width="150px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="os"
          label="是否热门"
          width="150px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="os"
          label="是否新服"
          width="150px"
        />
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import { gameServer, add, edit } from '@/api/gameServer'
import { getAll } from '@/api/gameRoom'
import { parseTime } from '@/utils/index'
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
  name: 'GameServer',
  components: { pagination, crudOperation, rrOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  // 数据字典
  dicts: ['cus_delstatus', 'cus_status', 'cus_kr_desc'],
  cruds() {
    return CRUD({
      title: '游戏服列表',
      url: 'api/gameServer',
      sort: 'gsid',
      crudMethod: { ...gameServer }
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
      serverForOpen: '',
      getDefualDate: null,
      getLastDate: null,
      isSendMsg: true,
      activeIndex: '1',
      defaultTime: [],
      valuenum: null,
      scopeData: {
        gamecode: null,
        gamedomain: null,
        gsid: null,
        infoKey: null,
        loginKey: null,
        opentime: null,
        pay_sign: null,
        paydomain: null,
        servercode: null,
        servername: null,
        opType: null,
        isshow: null
      },
      servicePeople: [],
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
      gamePlatform: [
        { id: 1, gamename: '港澳台', gameplatform: 'ggt' },
        { id: 2, gamename: '新马泰', gameplatform: 'xmt' },
        { id: 3, gamename: '港澳', gameplatform: 'ga' },
        { id: 4, gamename: '台湾', gameplatform: 'tw' },
        { id: 5, gamename: '大陆', gameplatform: 'cn' },
        { id: 6, gamename: '全球', gameplatform: 'all' }
      ],
      oContent: {},
      statusList: [
        { label: '自家经营', value: 'own' },
        { label: '联营', value: 'lianyin' },
        { label: '独家代理', value: 'proxy' }
      ],
      serviceValue: '',
      curdHook: ''
    }
  },
  created: function() {
    // this.getGameData()
    // this.getQusTypeData()
    // this.getAnsStatusData()
    // this.getDelStatusData()
    // this.getDate()
    this.getAllGame()
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },

    changeStatus() {
      this.isShowDelg = !this.isShowDelg
    },
    getAllGame() {
      getAll().then(res => {
        res.forEach((item) => {
          this.gameItemList.push(item.gamecode)
        })
      })
    },
    addGameServerInfo() {
      for (var key in this.scopeData) {
        this.scopeData[key] = null
      }
      this.crud.refresh()
      this.isShowDelg = !this.isShowDelg
      this.curdHook = 'add'
    },
    editGameServerInfo(data) {
      console.log(data)
      this.isShowDelg = !this.isShowDelg
      this.scopeData = data
      this.curdHook = 'edit'
    },

    getServiceValue() {
      console.log(parseTime(this.scopeData.opentime))
      console.log(this.scopeData)
      switch (this.curdHook) {
        case 'add':
          this.scopeData.addtime = parseTime(new Date())
          add(this.scopeData).then((res) => {
            this.crud.addSuccessNotify()
            this.isShowDelg = !this.isShowDelg
            for (var key in this.scopeData) {
              this.scopeData[key] = null
            }
            this.crud.refresh()
          })
          break
        case 'edit':
          this.scopeData.edittime = parseTime(new Date())
          edit(this.scopeData).then((res) => {
            this.crud.editSuccessNotify()
            this.isShowDelg = !this.isShowDelg
            for (var key in this.scopeData) {
              this.scopeData[key] = null
            }
            this.crud.refresh()
          })
          break
      }
    },
    selectGameCode(data) {
      this.scopeData.runstate = data
    },
    closeTip() {
      this.isShowDelg = !this.isShowDelg
      for (var key in this.scopeData) {
        this.scopeData[key] = null
      }
      this.crud.refresh()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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

/deep/ .el-dialog__wrapper {
  .el-dialog {
    height: 95%;
    overflow: auto;
    .el-dialog__header {
      padding: 20px;
      padding-bottom: 10px;
      background: #438eb9;
      .el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #fff;
      }
      .el-dialog__headerbtn {
        .el-dialog__close {
          color: #fff;
        }
      }
    }
    .el-dialog__body {
      padding: 0 1px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      .el-form-item {
        margin-bottom: 5px;
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
        .el-form-item__content {
          line-height: 40px;
          position: relative;
          font-size: 14px;
          border-left: 1px solid #ccc;
          padding: 0 10px;
        }
      }
    }
    .el-dialog__footer {
      padding: 20px;
      padding-top: 10px;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
