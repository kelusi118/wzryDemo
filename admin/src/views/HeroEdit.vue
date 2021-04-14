<template>
  <div class="">
    <h3>{{ id?'编辑':'新建'}}英雄</h3>
    <el-form ref="model" label-width="120px">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-card>
            <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl" 
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(model,'avatar',res.url)">
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="banner">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl" 
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(model,'banner',res.url)">
                <img v-if="model.banner" :src="model.banner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item  label="类型">
              <el-select v-model="model.categories" multiple placeholder="请选择">
                <el-option 
                  v-for="item of categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option> 
              </el-select>
            </el-form-item>
            <el-form-item label="难度">
              <el-rate style="margin-top:0.6rem;" :max="9" v-model="model.scores.difficult" show-score></el-rate>
            </el-form-item>
            <el-form-item label="技能">
              <el-rate style="margin-top:0.6rem;" :max="9" v-model="model.scores.skills" show-score></el-rate>
            </el-form-item>
            <el-form-item label="攻击">
              <el-rate style="margin-top:0.6rem;" :max="9" v-model="model.scores.attack" show-score></el-rate>
            </el-form-item>
            <el-form-item label="生存">
              <el-rate  style="margin-top:0.6rem;" :max="9" v-model="model.scores.survive" show-score></el-rate>
            </el-form-item>
            <el-form-item label="顺风出装">
              <el-select
                v-model="model.item1"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择出装">
                <el-option
                  v-for="item of item1"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风出装">
                <el-select
                  v-model="model.item2"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择出装">
                  <el-option
                    v-for="item of item2"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="铭文推荐">
              <el-select v-model="model.inscriptions" filterable multiple placeholder="请选择">
                <el-option
                  v-for="item in inscriptions"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用技巧">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="model.usageTips">
              </el-input>
            </el-form-item>
            <el-form-item label="对抗技巧">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="model.battleTips">
              </el-input>
            </el-form-item>
            <el-form-item label="团战思路">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="model.teamTips">
              </el-input>
            </el-form-item>     
          </el-card>
        </el-tab-pane>

        <!-- <el-tab-pane label="铭文推荐" name="inscription">
          <el-button size="sm" type="primary" @click="model.inscription.push({})"><i class="el-icon-plus"></i>添加铭文</el-button>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
              <el-col :span="8" v-for="(item,i) in model.inscription" :key="i">
                <el-card style="margin-top:1rem;">
                <el-form-item label="名称" label-width="80px" >
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="攻速加成" label-width="80px">
                  <el-input v-model="item.attackbonus"></el-input>
                </el-form-item>
                <el-form-item label="法术加成" label-width="80px">
                  <el-input v-model="item.spellbonus"></el-input>
                </el-form-item>
                <el-form-item label="图标" label-width="80px">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl" 
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>$set(item,'icon',res.url)">                          <img v-if="item.icon" :src="item.icon" style="width:200px;height:100%;">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>     
                </el-form-item>
                
                  <el-form-item style="margin-top:1rem;" label-width="80px">
                    <el-button size="small" type="danger" @click="model.inscription.splice(i,1)">删除</el-button>
                 </el-form-item>
                </el-card>
              </el-col>
            </el-row>
        </el-tab-pane> -->

        <el-tab-pane label="英雄皮肤" name="skins">
          <el-button size="sm" type="primary" @click="model.skins.push({})"><i class="el-icon-plus"></i>添加皮肤</el-button>
            <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
              <el-col :span="12" v-for="(item,i) in model.skins" :key="i">
                <el-card style="margin-top:1rem;">
                  <el-tag type="success">皮肤{{i+1}}</el-tag>
                  <el-form-item label="名称" label-width="80px" >
                    <el-input v-model="item.title"></el-input>
                  </el-form-item>
                  <el-form-item label="皮肤" label-width="80px">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadUrl" 
                      :headers="getAuthHeaders()"
                      :show-file-list="false"
                      :on-success="res=>$set(item,'skin',res.url)">
                      <img v-if="item.skin" :src="item.skin" style="width:200px;height:100%;">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                    <el-form-item style="margin-top:1rem;" label-width="80px">
                      <el-button size="small" type="danger" @click="model.skins.splice(i,1)">删除</el-button>
                  </el-form-item>
                </el-card>
              </el-col>
            </el-row>
        </el-tab-pane>

        <el-tab-pane label="英雄技能" name="skills">
          <el-button size="sm" type="primary" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-card style="margin-top:1rem;">
                <el-tag type="primary">技能{{i+1}}</el-tag>
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl" 
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>$set(item,'icon',res.url)">
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:1rem;">
                  <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                </el-form-item>
             </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="英雄关系">
          <el-tabs value="partners">
            <el-tab-pane label="最佳搭档" name="partners">
                <el-button size="sm" type="primary" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
                  <el-col :span="12" v-for="(item,i) in model.partners" :key="i">
                    <el-card style="margin-top:1rem;">
                      <el-tag type="primary">英雄{{i+1}}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px" >
                        <el-select  filterable v-model="item.hero" placeholder="请选择英雄">
                          <el-option                   
                            v-for="hero in heroes"
                            :key="hero._id"
                            :label="hero.name"
                            :value="hero._id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="item.description"></el-input>
                      </el-form-item>   
                      <el-form-item style="margin-top:1rem;" label-width="80px">
                        <el-button size="small" type="danger" @click="model.partners.splice(i,1)">删除</el-button>
                      </el-form-item>
                    </el-card>
                  </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="被谁克制" name="beRestrained">
              <el-button size="sm" type="primary" @click="model.beRestrained.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
                  <el-col :span="12" v-for="(item,i) in model.beRestrained" :key="i">
                    <el-card style="margin-top:1rem;">
                      <el-tag type="primary">英雄{{i+1}}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px" >
                        <el-select  filterable v-model="item.hero" placeholder="请选择英雄">
                          <el-option                   
                            v-for="hero in heroes"
                            :key="hero._id"
                            :label="hero.name"
                            :value="hero._id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="item.description"></el-input>
                      </el-form-item>   
                      <el-form-item style="margin-top:1rem;" label-width="80px">
                        <el-button size="small" type="danger" @click="model.beRestrained.splice(i,1)">删除</el-button>
                      </el-form-item>
                    </el-card>
                  </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="克制谁" name="restrain">
              <el-button size="sm" type="primary" @click="model.restrain.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
                <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
                  <el-col :span="12" v-for="(item,i) in model.restrain" :key="i">
                    <el-card style="margin-top:1rem;">
                      <el-tag type="primary">英雄{{i+1}}</el-tag>
                      <el-form-item label="英雄名称" label-width="80px" >
                        <el-select  filterable v-model="item.hero" placeholder="请选择英雄">
                          <el-option                   
                            v-for="hero in heroes"
                            :key="hero._id"
                            :label="hero.name"
                            :value="hero._id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="item.description"></el-input>
                      </el-form-item>   
                      <el-form-item style="margin-top:1rem;" label-width="80px">
                        <el-button size="small" type="danger" @click="model.restrain.splice(i,1)">删除</el-button>
                      </el-form-item>
                    </el-card>
                  </el-col>
                </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        //关联模型数据
        categories: [],
        item1:[],
        item2:[],
        heroes:[],
        inscriptions:[],
        model: {
            name:'',
            avatar:'',
            title:'',
            scores:{},
            skins: [],
            skills: [],
            partners: [],
            beRestrained: [],
            restrain: [],
            usageTips:'',    
        }
      };
    },
    methods: {
      async save() {
        /* 判断是新建还是编辑
          1.新建 post
          2.编辑 更新put
        */
        //console.log(this.model);
        let res //eslint-disable-line
        if(this.id){
          res = await this.$http.put(`rest/heroes/${this.id}`,this.model)//eslint-disable-line
        }else{
          res = await this.$http.post('rest/heroes',this.model)//eslint-disable-line
        }
        this.$router.push('/heroes/list')
        this.$message({
          type:'success',
          message: '保存成功'
        })
      },
      async fecth(){
        const res = await this.$http.get(`rest/heroes/${this.id}`)
        //this.model = res.data
        this.model = Object.assign({},this.model,res.data)
      },
      async fecthCategory(){
        const res = await this.$http.get('rest/categories')
        //console.log(res.data)
        //筛选出英雄分类的数据
        let cates = res.data
        cates = cates.filter(v=>v.name==='英雄分类')[0].children
        //console.log(cates);
        this.categories = cates
      },
      async fecthItem(){
        const res = await this.$http.get('rest/items')
        //console.log(res.data)
        this.item1 = res.data
        this.item2 = res.data
        this.inscriptions = res.data
      },
      async fecthHero(){
        const res = await this.$http.get('rest/heroes')
        //console.log(res.data);
        this.heroes = res.data
      },
    },
    created(){
      //id存在即位编辑页面，有初始的数据显示
      this.id && this.fecth()
      this.fecthCategory()
      this.fecthItem()
      this.fecthHero()
    }
  }
</script>
