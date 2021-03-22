
<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <div class="select_tool">
          <!-- 搜索 -->
          <el-input
            v-model="query.game_code"
            clearable
            placeholder="game_code"
            style="width: 130px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.package_name"
            clearable
            placeholder="packageName"
            style="width: 180px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.product_id"
            clearable
            placeholder="品项id"
            style="width: 180px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.site_code"
            clearable
            placeholder="siteCode"
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
          @click="addIosPro()"
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
        @close="clearValue"
      >
        <el-form
          ref="form"
          :model="scopeData"
          :rules="rules"
          size="small"
          label-width="120px"
        >
          <el-form-item label="游戏名称">
            <el-select
              v-model="scopeData.game_code"
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
          <el-form-item label="siteCode">
            <el-input v-model="scopeData.site_code" style="width: 200px" />
          </el-form-item>
          <el-form-item label="packageName">
            <el-input v-model="scopeData.package_name" style="width: 200px" />
          </el-form-item>
          <el-form-item label="品项ID">
            <el-input
              v-model="scopeData.product_id"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="money">
            <el-input
              v-model="scopeData.money"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item v-if="isShow" label="rgMoney">
            <el-input
              v-model="scopeData.deviceInformation"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="游戏币">
            <el-input
              v-model="scopeData.lpoint"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="货币">
            <el-input
              v-model="scopeData.currency"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="开放国家">
            <el-input
              v-model="scopeData.country"
              style="width: 200px"
            />
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
          width="125px"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editIosPro(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="game_code"
          label="gameCode"
          width="85px"
        />
        <el-table-column
          align="center"
          prop="site_code"
          label="siteCode"
          width="200px"
        />
        <el-table-column
          align="center"
          prop="package_name"
          label="packageName"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="product_id"
          label="productID"
          width="200px"
        />
        <el-table-column
          align="center"
          prop="money"
          label="money"
          width="80px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="packagename"
          label="rgMoney"
          width="80px"
        />
        <el-table-column
          align="center"
          prop="lpoint"
          label="游戏币"
          width="100px"
        />
        <el-table-column
          align="center"
          prop="currency"
          label="currency"
          width="120px"
        />
        <el-table-column
          v-if="isShow"
          align="center"
          prop="status"
          label="状态"
          width="150px"
        />
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import { transactionApplepayProduct, add, edit } from '@/api/gameConfigManagement/transactionApplepayProduct'
import { getAll } from '@/api/gameRoom'
import { parseTime } from '@/utils/index'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
// import { parseTime } from '@/utils/index'

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
  name: 'TransactionApplepayProduct',
  components: { pagination, crudOperation, rrOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  // 数据字典
  dicts: ['cus_delstatus', 'cus_status', 'cus_kr_desc'],
  cruds() {
    return CRUD({
      title: 'ios品项配置',
      url: 'api/transactionApplepayProduct',
      sort: 'id,desc',
      crudMethod: { ...transactionApplepayProduct }
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
        country: null,
        currency: null,
        game_code: null,
        lpoint: null,
        money: null,
        package_name: null,
        product_id: null,
        site_code: null,
        status: null
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
      oContent: {},
      msgs: [],
      serviceValue: '',
      curdHook: ''
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
      getAll().then(res => {
        res.forEach((item) => {
          this.gameItemList.push(item.gamecode)
        })
      })
    },
    changeStatus(data) {
      this.isShowDelg = !this.isShowDelg
    },
    selectGameCode(data) {
      this.scopeData.game_code = data
    },

    addIosPro() {
      for (var key in this.scopeData) {
        this.scopeData[key] = null
      }
      this.crud.refresh()
      this.isShowDelg = !this.isShowDelg
      this.curdHook = 'add'
    },
    editIosPro(data) {
      console.log(data)
      this.isShowDelg = !this.isShowDelg
      this.scopeData = data
      this.curdHook = 'edit'
    },

    getServiceValue() {
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
    clearValue() {
      console.log('1')
    },
    closeTip() {
      this.isShowDelg = !this.isShowDelg
      for (var key in this.scopeData) {
        this.scopeData[key] = null
      }
      this.crud.refresh()
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
    .el-dialog__header {
      padding: 20px;
      padding-bottom: 10px;
      background: #438eb9;
      .el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #fff;
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
        padding: 10px 0;
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
