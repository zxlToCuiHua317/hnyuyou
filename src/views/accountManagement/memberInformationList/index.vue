<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <div v-if="crud.props.searchToggle">
        <div class="select_tool">
          <!-- 搜索 -->
          <el-input
            v-model="query.username"
            clearable
            placeholder="用户账号"
            style="width: 150px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.passport"
            clearable
            placeholder="passport"
            style="width: 200px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.site_username"
            clearable
            placeholder="第三方用户id"
            style="width: 150px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.regip"
            clearable
            placeholder="regip"
            style="width: 150px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-input
            v-model="query.email"
            clearable
            placeholder="email"
            style="width: 200px"
            class="filter-item"
            @keyup.enter.native="crud.toQuery"
          />
          <el-select
            v-model="query.sitecode"
            clearable
            size="small"
            placeholder="用户来源"
            class="filter-item"
            style="width: 120px"
            @change="crud.toQuery"
          >
            <el-option
              v-for="item in gameOptions"
              :key="item.key"
              :label="item.data"
              :value="item.data"
            />
          </el-select>
          <el-select
            v-model="query.isupgrade"
            clearable
            size="small"
            placeholder="是否升级"
            class="filter-item"
            style="width: 120px"
            @change="crud.toQuery"
          >
            <el-option
              v-for="item in upgradeList"
              :key="item.key"
              :label="item.data"
              :value="item.id"
            />
          </el-select>
          <el-select
            v-model="query.disabled"
            clearable
            size="small"
            placeholder="是否冻结"
            class="filter-item"
            style="width: 120px"
            @change="crud.toQuery"
          >
            <el-option
              v-for="item in disabledList"
              :key="item.key"
              :label="item.data"
              :value="item.id"
            />
          </el-select>
        </div>

        <rrOperation />
        <!-- <el-button
          v-if="crud.optShow.download"
          :loading="crud.downloadLoading"
          :disabled="!crud.data.length"
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-download"
          @click="exportExels(defaultTime)"
        >导出</el-button> -->
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
      >
        <el-table-column type="selection" width="60" />

        <el-table-column align="center" prop="id" label="序号" width="65px" />

        <el-table-column
          align="center"
          prop="username"
          label="用户账号"
          width="200px"
        />
        <el-table-column
          align="center"
          prop="passport"
          label="passport"
          width="200px"
        />
        <el-table-column
          align="center"
          prop="site_username"
          label="第三方用户id"
          width="200px"
        />

        <el-table-column
          align="center"
          prop="sitecode"
          label="来源"
          width="130px"
        />
        <el-table-column
          align="center"
          prop="regdate"
          label="注册日期"
          width="200px"
        />
        <el-table-column align="center" prop="reg_area" label="地区" />
        <el-table-column
          align="center"
          prop="regip"
          label="ip地址"
          width="130px"
        />
        <el-table-column
          align="center"
          prop="password"
          label="password"
          width="230px"
        />
        <el-table-column
          align="center"
          prop="email"
          label="email"
          width="160px"
        />
        <el-table-column
          align="center"
          prop="isupgrade"
          type="danger"
          class-name="changeRed"
          :class="'changeRed'"
          label="是否升级"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.isupgrade === 0"
              size="small"
              type="danger"
            >{{ "未升级" }}</el-tag>
            <el-tag
              v-if="scope.row.isupgrade === 1"
              size="small"
              type="success"
            >{{ "已升级" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="disabled"
          type="danger"
          class-name="changeRed"
          :class="'changeRed'"
          label="是否冻结"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.disabled === 0"
              size="small"
              type="danger"
            >{{ "未冻结" }}</el-tag>
            <el-tag
              v-if="scope.row.disabled === 1"
              size="small"
              type="success"
            >{{ "已冻结" }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="game_code"
          label="游戏"
          width="120px"
        />
        <el-table-column align="center" prop="really_name" label="真实名" />
        <el-table-column align="center" prop="sex" label="性别" />
        <el-table-column
          align="center"
          prop="birthday"
          label="生日"
          width="130px"
        />
        <el-table-column
          align="center"
          prop="identity_card"
          label="身份证"
          width="200px"
        />
        <el-table-column
          align="center"
          prop="telephone_areacode"
          label="区号"
          width="80px"
        />
        <el-table-column
          align="center"
          prop="telephone"
          label="电话"
          width="130px"
        />
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import { gameUser } from '@/api/gameUser'
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
  delStatus: null,
  last_modify_time: null
}
export default {
  name: 'GameUser',
  components: { pagination, crudOperation, rrOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  // 数据字典
  dicts: ['cus_delstatus', 'cus_status', 'cus_kr_desc'],
  cruds() {
    return CRUD({
      title: '会员',
      url: 'api/gameUser',
      sort: 'id',
      crudMethod: { ...gameUser }
    })
  },
  data() {
    return {
      gameOptions: [
        { id: 0, data: 'mobile_fs' },
        { id: 1, data: 'phoneNumLogin' },
        { id: 2, data: 'hnyuyou' }
      ],
      upgradeList: [
        { id: 0, data: '未升级' },
        { id: 1, data: '升级' }
      ],
      disabledList: [
        { id: 0, data: '未冻结' },
        { id: 1, data: '冻结' }
      ],
      permission: {
        add: ['admin', 'cusQuestionList:add'],
        edit: ['admin', 'cusQuestionList:edit'],
        del: ['admin', 'cusQuestionList:del']
      }
    }
  },
  created: function() {
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
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
