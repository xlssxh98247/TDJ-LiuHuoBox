<template>
    <div class="common-layout">
        <el-container style="height:100vh">
            <el-header style="--el-header-padding:0px">
                <el-row class="container">
                    <el-col :span="24" class="header">
                        <el-image :src="'/logo.png'" fit="cover" style="height:60px; align-items: center;" />
                        <el-text class="header-title">天地劫流火盒子工具</el-text>
                    </el-col>
                </el-row>
            </el-header>
            <!-- <el-container style="background-image: url('/background.jpg'); background-size: cover;"> -->
            <el-container>
                <el-aside width="33%">
                    <div v-for="(col, index) in boxStyleValue" :key="index" style="margin-left: 20px">
                        <el-space :size="20">
                            <div v-for="(row, rowIndex) in col" :key="rowIndex" class="radius" :style="{boxShadow:row.shadowValue}" @mouseover="mouseOverBox(index, rowIndex)" @mouseout="mouseOutBox(index, rowIndex)">
                                <el-button v-if="row.url === ''" class="boxButton" @click.native="boxSelectOn(index,rowIndex)">点击选择英灵</el-button>
                                <el-image v-if="row.url !== ''" class="boxImage" style="border-radius:20px;" :src="row.url" fit="fill" @click.native="boxSelectOn(index,rowIndex)" />
                            </div>
                            <div v-if="index === 3" class="radius">
                                <el-image style="border-radius:20px;" :src="'/banner.png'" fit="cover" />
                            </div>
                        </el-space>
                    </div>
                </el-aside>
                <el-main>
                    <el-card class="box-card" :style="{borderRadius:`var(--el-border-radius-round)`}" style="width: 99%">
                        <template #header>
                            <div class="card-header">
                                <span>BOX统计</span>
                            </div>
                        </template>
                        <p>
                            <span>属相统计：</span>
                            <el-space :size="20" spacer="|">
                                <div v-for="item in shuxiang" :key="item" style="display: flex; align-items: center;">
                                    <el-avatar :size="20" :src="'/shuxiang/'+ item + '.png'" fit="cover" />
                                    <span>{{ item }}:{{ selectedShuxiang[item] }}</span>
                                </div>
                            </el-space>
                        </p>
                        <p>
                            <span>职业统计：</span>
                            <el-space :size="20" spacer="|">
                                <div v-for="item in zhiye" :key="item" style="display: flex; align-items: center;">
                                    <el-avatar :size="20" :src="'/zhiye/'+ item + '.png'" fit="cover" />
                                    <span>{{ item }}:{{ selectedZhiYe[item] }}</span>
                                </div>
                            </el-space>
                        </p>
                        <p>
                            <span>阵法统计：</span>
                            <el-space :size="20" spacer="|">
                                <div style="display: flex; align-items: center;">累计个数:{{ selectedZhenFa["累计个数"] }}</div>
                                <div style="display: flex; align-items: center;">可生效个数:{{ selectedZhenFa["可生效个数"] }}</div>
                                <div style="display: flex; align-items: center;">无法生效个数:{{ selectedZhenFa["无法生效个数"] }}</div>
                            </el-space>
                        </p>
                    </el-card>
                    <el-card class="box-card" :style="{borderRadius:`var(--el-border-radius-round)`}" style="width: 99%; margin-top: 20px;">
                        <template #header>
                            <div class="card-header">
                                <span>阵法详情</span>
                            </div>
                        </template>
                        <el-empty v-if="zhenfas.length === 0" image="/etc/buxing.png" description="暂无阵眼英灵，请选择阵眼英灵！成熟的配队要求必须要有阵眼英灵！" />
                        <div v-for="(item, index) in zhenfas" :key="item" :style="index % 5 === 0 ? 'clear:left' : ''">
                            <el-card class="box-card" :style="{borderRadius:`var(--el-border-radius-round)`}" style="width: 18%; margin-bottom: 20px; margin-right: 15px; float:left;">
                                <template #header>
                                    <div class="card-header" style="display: flex; align-items: center;">
                                        <el-avatar :src="'/touxiang/' + item['阵眼'] + '.png'"></el-avatar>
                                        <el-popover
                                            placement="top-start"
                                            trigger="hover"
                                            title="阵法增益"
                                            width="18%"
                                            :content="item['阵法Buffer']"
                                        >
                                            <template #reference>
                                                <span>{{ item["阵法名"] }}</span>
                                            </template>
                                        </el-popover>
                                        <span v-if="item['阵法是否可以启用'] === false" style="color: red;font-weight: bold;">(无法满足需求)</span>
                                        <span v-else style="color: green;">(可以满足需求)</span>
                                    </div>
                                </template>
                                <p>
                                    <span>阵法条件1:{{ item["阵法条件1"] }}</span>
                                </p>
                                <p>
                                    <span v-if="item['阵法条件1满足英灵'].length === 0" style="color: red;font-weight: bold;">无满足条件英灵</span>
                                    <el-popover v-for="yl1 in item['阵法条件1满足英灵']" :key="yl1" 
                                        placement="bottom-start"
                                        trigger="hover"
                                        :content="yl1['name']"
                                    >
                                        <template #reference>
                                            <el-avatar :src="yl1['url']" fit="cover"></el-avatar>
                                        </template>
                                    </el-popover>
                                </p>
                                <p>
                                    <span>阵法条件2:{{ item["阵法条件2"] }}</span>
                                </p>
                                <p>
                                    <span v-if="item['阵法条件2满足英灵'].length === 0" style="color: red;font-weight: bold;">无满足条件英灵</span>
                                    <el-popover v-for="yl2 in item['阵法条件2满足英灵']" :key="yl1" 
                                        placement="bottom-start"
                                        trigger="hover"
                                        :content="yl2['name']">
                                        <template #reference>
                                            <el-avatar :src="yl2['url']" fit="cover"></el-avatar>
                                        </template>
                                    </el-popover>
                                </p>
                            </el-card>
                        </div>
                    </el-card>
                    <span v-html="tip" @click="tipsChange()"></span>
                </el-main>
            </el-container>
        </el-container>
    </div>

    <!--英灵选择界面-->
    <el-drawer  title="选择英灵" size="32%" v-model="boxSelectVisible" :show-close="false" :close-on-click-modal="true" direction="ltr" :with-header="false" destroy-on-close center>
        <el-form ref="boxSelectFormIndex" :model="boxSelectForm" label-width="auto" style="margin-left: 3%"> 
            <el-form-item label="属相">
                <el-checkbox-group v-model="boxSelectForm.shuxiang">
                    <el-checkbox-button v-for="sx in shuxiang" :key="sx" :value="sx">{{ sx }}</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="属相统计">
                <el-space wrap>
                    <el-tag v-for="item in shuxiang" :key="item"  effect="plain">{{item}}:{{ selectedShuxiang[item] }}{{ selectedShuxiangAdd[item] }}</el-tag>
                </el-space>
            </el-form-item>
            <el-form-item label="职业">
                <el-checkbox-group v-model="boxSelectForm.zhiye">
                    <el-checkbox-button v-for="zy in zhiye" :key="zy" :value="zy">{{ zy }}</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="职业统计">
                <el-space wrap>
                    <el-tag v-for="item in zhiye" :key="item" effect="plain">{{item}}:{{ selectedZhiYe[item] }}{{ selectedZhiYeAdd[item] }}</el-tag>
                </el-space>
            </el-form-item>
            <el-form-item label="性别">
                <el-checkbox-group v-model="boxSelectForm.gender">
                    <el-checkbox-button v-for="item in gender" :key="item" :value="item">{{ item }}</el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="拥有阵法">
                <el-switch v-model="boxSelectForm.hasZF" />
            </el-form-item>
            <el-table :data="boxTable" :style="{ width: '100%' }" height="800px" highlight-current-row @current-change="handleCurrentChange">
                <el-table-column label="立绘" width="100">
                    <template v-slot:default="scope">
                        <el-avatar :size="50" :src="scope.row.image" fit="cover" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名字" width="100" />
                <el-table-column prop="shuxiang" label="属相" width="60" />
                <el-table-column prop="zhiye" label="职业" width="180" />
                <el-table-column prop="zhenfa" label="阵法" width="180" />
                <el-table-column prop="zhenfaMiaoShu" label="阵法需求"/>
            </el-table>
            <el-form-item label="当前选择：">
                <div>{{ currentrow.name === '' ? '未选择' :  currentrow.name}}</div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="boxSelectOver">确认选择</el-button>
                <el-button @click="boxSelectVisible = false">取消选择</el-button>
            </div>
        </template>
    </el-drawer >
</template>

<script>
import { ElCard } from 'element-plus';
import { watch } from 'vue'
import{ref} from 'vue'
import { reactive } from 'vue';
import { ElNotification } from 'element-plus'

export default{
    data(){
        return{
            boxIsMoveOver:[[-1, -1, -1. -1], [-1, -1, -1. -1], [-1, -1, -1, -1], [-1, -1, -1]],
            boxStyleValue:[
                [{radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}],
                [{radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}],
                [{radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}],
                [{radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}, {radiusValue:'', shadowValue: '', url: '', selectedCharacter:'', name:''}]
            ],
            boxSelectVisible:false,
            boxSelectForm: reactive({
                shuxiang: ['炎', '冰', '雷', '光', '暗', '幽'],
                zhiye: ['铁卫', '咒师', '祝由', '羽士', '御风', '侠客', '斗将'],
                gender: ["男", "女"],
                hasZF: false
            }),
            shuxiang : ['炎', '冰', '雷', '光', '暗', '幽'],
            zhiye : ['铁卫', '咒师', '祝由', '羽士', '御风', '侠客', '斗将'],
            gender: ["男", "女"],
            getBoxTable:[],
            boxTable:[],
            selectedBox:{ col : 0, row : 0 },
            currentrow : {name: '', image :'', shuxiang: "", zhiye: ''},
            selectedCharacter:[],
            selectedShuxiang:{
                "炎" : 0, "冰": 0, "雷": 0, "光": 0, "暗": 0, "幽": 0, 
            },
            selectedShuxiangAdd:{
                "炎" : '', "冰": '', "雷": '', "光": '', "暗": '', "幽": '', 
            },
            selectedZhiYe:{
                "铁卫" : 0, "咒师": 0, "祝由": 0, "羽士": 0, "御风": 0, "侠客": 0, "斗将": 0, 
            },
            selectedZhiYeAdd:{
                "铁卫" : '', "咒师": '', "祝由": '', "羽士": '', "御风": '', "侠客": '', "斗将": '', 
            },
            selectedZhenFa:{
                "累计个数": 0, "可生效个数": 0, "无法生效个数": 0,
            },
            zhenfas: [],
            tips: ['恭喜你，离毁灭这个世界又近了一步。', '陆文生就是个假正经！', '故事会走向原本的结局吗？'],
            tip: ''
        }
    },
    watch:{
        'boxSelectForm.shuxiang': function(val){
            this.boxCharacterFilter(val, this.boxSelectForm.zhiye, this.boxSelectForm.gender, this.boxSelectForm.hasZF);
        },

        'boxSelectForm.zhiye': function(val){
            this.boxCharacterFilter(this.boxSelectForm.shuxiang, val, this.boxSelectForm.gender, this.boxSelectForm.hasZF);
        },

        'boxSelectForm.gender': function(val){
            this.boxCharacterFilter(this.boxSelectForm.shuxiang, this.boxSelectForm.zhiye, val, this.boxSelectForm.hasZF);
        },
        'boxSelectForm.hasZF': function(val){
            this.boxCharacterFilter(this.boxSelectForm.shuxiang, this.boxSelectForm.zhiye, this.boxSelectForm.gender, val);
        }
    },

    methods:{
        boxCharacterFilter: function(shuxiang, zhiye, gender, zhenfa){
            this.boxTable = [];
            for(let i = 0; i < this.getBoxTable.length; i++){
                let isSXFind = false;
                let isZYFind = false;
                let isGenderFind = false;
                let isZFFind = false;
                let isSelected = false;
                for(let j = 0; j < this.boxSelectForm.shuxiang.length; j++){
                    if(this.getBoxTable[i].shuxiang === shuxiang[j]){
                        isSXFind = true;
                    }
                }
                for(let t = 0; t < this.boxSelectForm.zhiye.length; t++){
                    if(this.getBoxTable[i].zhiye === zhiye[t]){
                        isZYFind = true;
                    }
                }
                for(let t = 0; t < this.boxSelectForm.gender.length; t++){
                    if(this.getBoxTable[i].gender === gender[t]){
                        isGenderFind = true;
                    }
                }
                
                if(zhenfa === true){
                    if(this.getBoxTable[i].zhenfa != "无"){
                        isZFFind = true;
                    }
                }else{
                    isZFFind = true;
                }

                for(let j = 0; j < this.selectedCharacter.length; j++){
                    if(this.selectedCharacter[j] === this.getBoxTable[i].name){
                        isSelected = true;
                    }
                }

                if(isSXFind && isZYFind && isGenderFind && isZFFind && !isSelected){
                    this.boxTable.push(this.getBoxTable[i]);
                }
            }
        },

        boxValueSet : function(col, row){
            if(this.boxIsMoveOver[col][row] == -1){
                this.boxStyleValue[col][row].radiusValue = 'var(--el-border-radius-round)';
                this.boxStyleValue[col][row].shadowValue = 'var(--el-box-shadow)';
            }else{
                this.boxStyleValue[col][row].shadowValue = 'var(--el-box-shadow-dark)';
            }
        },

        mouseOverBox(col, row){
            this.boxIsMoveOver[col][row] = 1;
            this.boxValueSet(col, row);
        },

        mouseOutBox(col, row){
            this.boxIsMoveOver[col][row] = -1;
            this.boxValueSet(col, row);
        },

        boxSelectOn(col, row){
            this.boxTable = [];
            this.boxSelectForm = reactive({
                shuxiang: ['炎', '冰', '雷', '光', '暗', '幽'],
                zhiye: ['铁卫', '咒师', '祝由', '羽士', '御风', '侠客', '斗将'],
                gender: ["男", "女"],
                hasZF: false
            });
            this.selectedShuxiangAdd = {
                "炎" : '', "冰": '', "雷": '', "光": '', "暗": '', "幽": '', 
            };
            this.selectedZhiYeAdd = {
                "铁卫" : '', "咒师": '', "祝由": '', "羽士": '', "御风": '', "侠客": '', "斗将": '', 
            };
            this.currentrow = {name: '', image :''},
            this.boxSelectVisible = true;
            this.selectedBox.col = col;
            this.selectedBox.row = row;
            for(let i = 0; i < this.getBoxTable.length; i++){
                let isFind = false;
                for(let j = 0; j < this.selectedCharacter.length; j++){
                    if(this.selectedCharacter[j] === this.getBoxTable[i].name){
                        isFind = true;
                    }
                }
                if(!isFind){
                    this.boxTable.push(this.getBoxTable[i]);
                }
            }
        },
        
        shuxiangSearchInChara(shuxiang1, shuxiang2, name, zhenfaXiangQing){
            let first = false, second = false;
            for(let i = 0; i < this.selectedCharacter.length; i++){
                if(name !== this.selectedCharacter[i]){
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(first === false && this.selectedCharacter[i] === this.getBoxTable[j].name && shuxiang1 === this.getBoxTable[j].shuxiang){
                            first =true;
                            continue;
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && shuxiang2 === this.getBoxTable[j].shuxiang){
                            second =true;
                        }
                    }
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && shuxiang1 === this.getBoxTable[j].shuxiang){
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件1满足英灵"].push(temp)
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && shuxiang2 === this.getBoxTable[j].shuxiang){
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件2满足英灵"].push(temp)
                        }
                    }
                }
            }
            if(first === true && second === true){
                return true;
            }
            return false;
        },

        genderSearchInChara(gender1, gender2, name, zhenfaXiangQing){
            let first = false, second = false;
            for(let i = 0; i < this.selectedCharacter.length; i++){
                if(name !== this.selectedCharacter[i]){
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(first === false && this.selectedCharacter[i] === this.getBoxTable[j].name && gender1 === this.getBoxTable[j].gender){
                            first =true;
                            continue;
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && gender2 === this.getBoxTable[j].gender){
                            second =true;
                        }
                    }
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && gender1 === this.getBoxTable[j].gender){
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件1满足英灵"].push(temp)
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && gender2 === this.getBoxTable[j].gender){
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件2满足英灵"].push(temp)
                        }
                    }
                }
            }
            if(first === true && second === true){
                return true;
            }
            return false;
        },
        zhenfaSearchInChara(name, zhenfaXiangQing){
            let first = false, second = false;
            for(let i = 0; i < this.selectedCharacter.length; i++){
                if(name !== this.selectedCharacter[i]){
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(first === false && this.selectedCharacter[i] === this.getBoxTable[j].name && '无' != this.getBoxTable[j].zhenfa){
                            first =true;
                            continue;
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && '无' != this.getBoxTable[j].zhenfa){
                            second =true;
                        }
                    }
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && '无' != this.getBoxTable[j].zhenfa){
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件1满足英灵"].push(temp)
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && '无' != this.getBoxTable[j].zhenfa){
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件2满足英灵"].push(temp)
                        }
                    }
                }
            }
            if(first === true && second === true){
                return true;
            }
            return false;
        },

        zhiyeSearchInChara(zhiye1, zhiye2, name, zhenfaXiangQing){
            let first = false, second = false;
            for(let i = 0; i < this.selectedCharacter.length; i++){
                if(name !== this.selectedCharacter[i]){
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && zhiye1 === this.getBoxTable[j].zhiye){
                            first =true;
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件1满足英灵"].push(temp)
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && zhiye2 === this.getBoxTable[j].zhiye){
                            second =true;
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件2满足英灵"].push(temp)
                        }
                    }
                }
            }
            if(first === true && second === true){
                return true;
            }
            return false;
        },

        nameSearchInChara(searchName1, searchName2, name, zhenfaXiangQing){
            let first = false, second = false;
            for(let i = 0; i < this.selectedCharacter.length; i++){
                if(name !== this.selectedCharacter[i]){
                    for(let j = 0; j < this.getBoxTable.length; j++){
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && searchName1 === this.getBoxTable[j].name){
                            first =true;
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件1满足英灵"].push(temp)
                        }
                        if(this.selectedCharacter[i] === this.getBoxTable[j].name && searchName2 === this.getBoxTable[j].name){
                            second =true;
                            let temp = {
                                "name" : this.selectedCharacter[i],
                                "url" : this.getBoxTable[j].image
                            }
                            zhenfaXiangQing["阵法条件2满足英灵"].push(temp)
                        }
                    }
                }
            }
            if(first === true && second === true){
                return true;
            }
            return false;
        },

        zhenfaSearch(name){
            for(let i = 0; i < this.getBoxTable.length; i++){
                if(name === this.getBoxTable[i].name){
                    return [this.getBoxTable[i].zhenfa, this.getBoxTable[i].zhenfaType, this.getBoxTable[i].zhenfaCond, this.getBoxTable[i].zhenfaBuffer]
                }
            }
            if(first === true && second === true){
                return true;
            }
            return []
        },

        zhenfaCheck(){
            this.selectedZhenFa['累计个数'] = 0;
            this.selectedZhenFa['无法生效个数'] = 0;
            this.selectedZhenFa['可生效个数'] = 0;
            for(let i = 0; i < this.selectedCharacter.length; i++){
                var zhenfa, zhenfaType, zhenfaCond, zhenfaIsOpen, zhenfaBuffer;
                [zhenfa, zhenfaType, zhenfaCond, zhenfaBuffer] = this.zhenfaSearch(this.selectedCharacter[i])
                if(zhenfa != "无"){
                    this.selectedZhenFa['累计个数']++;

                    let zhenfaXiangQing = {
                        "阵眼" : this.selectedCharacter[i],
                        "阵法名" : zhenfa,
                        "阵法类型" : zhenfaType,
                        "阵法条件1" : zhenfaCond["firstCond"],
                        "阵法条件1满足英灵" : [],
                        "阵法条件2" : zhenfaCond["secondCond"],
                        "阵法条件2满足英灵" : [],
                        "阵法是否可以启用" : false,
                        "阵法Buffer" : zhenfaBuffer
                    }

                    switch(zhenfaType){
                        case "ShuXiang":
                            if(this.shuxiangSearchInChara(zhenfaCond["firstCond"], zhenfaCond["secondCond"], this.selectedCharacter[i], zhenfaXiangQing)){
                                this.selectedZhenFa['可生效个数']++;
                                zhenfaIsOpen = true;
                            }
                            else{
                                this.selectedZhenFa['无法生效个数']++;
                                zhenfaIsOpen = false;
                            }
                            break;
                        case "Gender":
                            if(this.genderSearchInChara(zhenfaCond["firstCond"], zhenfaCond["secondCond"], this.selectedCharacter[i], zhenfaXiangQing)){
                                this.selectedZhenFa['可生效个数']++;
                                zhenfaIsOpen = true;
                            }
                            else{
                                this.selectedZhenFa['无法生效个数']++;
                                zhenfaIsOpen = false;
                            }
                            break;
                        case "ZhiYe":
                            if(this.zhiyeSearchInChara(zhenfaCond["firstCond"], zhenfaCond["secondCond"], this.selectedCharacter[i], zhenfaXiangQing)){
                                this.selectedZhenFa['可生效个数']++;
                                zhenfaIsOpen = true;
                            }
                            else{
                                this.selectedZhenFa['无法生效个数']++;
                                zhenfaIsOpen = false;
                            }
                            break;
                        case "Name":
                            if(this.nameSearchInChara(zhenfaCond["firstCond"], zhenfaCond["secondCond"], this.selectedCharacter[i], zhenfaXiangQing)){
                                this.selectedZhenFa['可生效个数']++;
                                zhenfaIsOpen = true;
                            }
                            else{
                                this.selectedZhenFa['无法生效个数']++;
                                zhenfaIsOpen = false;
                            }
                            break;
                        case "ZhenFa":
                            if(this.zhenfaSearchInChara(this.selectedCharacter[i], zhenfaXiangQing)){
                                this.selectedZhenFa['可生效个数']++;
                                zhenfaIsOpen = true;
                            }
                            else{
                                this.selectedZhenFa['无法生效个数']++;
                                zhenfaIsOpen = false;
                            }
                            break;
                    }
                    zhenfaXiangQing["阵法是否可以启用"] = zhenfaIsOpen;
                    this.zhenfas.push(zhenfaXiangQing)
                }
            }
        },

        boxSelectOver(){
            this.zhenfas = [];
            if(this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].name != this.currentrow.name){
                this.selectedCharacter = this.selectedCharacter.filter(item => item != this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].name)
                for(let i = 0; i < this.getBoxTable.length; i++){
                    if(this.getBoxTable[i].name === this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].name){
                        this.selectedShuxiang[this.getBoxTable[i].shuxiang]--;
                        this.selectedZhiYe[this.getBoxTable[i].zhiye]--;
                        break;
                    }
                }
            }
            this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].name = this.currentrow.name;
            this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].url = this.currentrow.image;
            this.selectedCharacter.push(this.currentrow.name)
            this.selectedShuxiang[this.currentrow.shuxiang]++;
            this.selectedZhiYe[this.currentrow.zhiye]++;
            this.zhenfaCheck();
            this.boxSelectVisible = false;
        },

        handleCurrentChange(val){
            if(val != null){
                this.selectedShuxiangAdd = {
                    "炎" : '', "冰": '', "雷": '', "光": '', "暗": '', "幽": '', 
                };
                this.selectedZhiYeAdd ={
                    "铁卫" : '', "咒师": '', "祝由": '', "羽士": '', "御风": '', "侠客": '', "斗将": '', 
                };
                this.currentrow.name = val.name;
                this.currentrow.image = val.image;
                this.currentrow.shuxiang = val.shuxiang;
                this.currentrow.zhiye = val.zhiye;
                if(this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].name != ''){
                    for(let i = 0; i < this.getBoxTable.length; i++){
                        if(this.getBoxTable[i].name === this.boxStyleValue[this.selectedBox.col][this.selectedBox.row].name){
                            if(this.getBoxTable[i].shuxiang != val.shuxiang){
                                this.selectedShuxiangAdd[this.getBoxTable[i].shuxiang] = '-1';
                                this.selectedShuxiangAdd[val.shuxiang] = '+1';
                            }
                            if(this.getBoxTable[i].zhiye != val.zhiye){
                                this.selectedZhiYeAdd[this.getBoxTable[i].zhiye] = '-1';
                                this.selectedZhiYeAdd[val.zhiye] = '+1';
                            }
                            break;
                        }
                    }
                }else{
                    this.selectedShuxiangAdd[val.shuxiang] = '+1';
                    this.selectedZhiYeAdd[val.zhiye] = '+1';
                }
            }
        },

        tipsChange(){
            var randomNum = Math.floor(Math.random() * this.tips.length);
            this.tip = this.tips[randomNum];
        },

    },

    mounted(){
        for(let i = 0; i < 4; i++){
            let temp = i == 3 ? 3 : 4;
            for(let j = 0; j < temp; j++){
                if(this.boxIsMoveOver[i][j] == -1){
                    this.boxStyleValue[i][j].radiusValue = 'var(--el-border-radius-round)';
                    this.boxStyleValue[i][j].shadowValue = 'var(--el-box-shadow)';
                }else{
                    this.boxStyleValue[i][j].shadowValue = 'var(--el-box-shadow-dark)';
                }
            }
        }

        fetch('/list.json')
            .then(response => response.json())
            .then(data => {
                this.getBoxTable = data;
                //console.log(data.length)
                //let name = [];
                //for(let i = 0; i < data.length; i++){
                //    let isFind = false;
                //    for(let j = 0; j < name.length; j++){
                //        if(name[j] === data[i].name){
                //            console.log(data[i].name);
                //            isFind = true;
                //        }
                //    }
                //    if(!isFind){
                //        name.push(data[i].name)
                //    }
                //}
            })
        

        this.boxSelectForm.hasZF = '1';

        var randomNum = Math.floor(Math.random() * this.tips.length);
        this.tip = this.tips[randomNum];
    },
}
</script>

<style scoped>
.container {
    width: 100%;
    .header {
        display: flex; 
        align-items: center;
        height: 60px;
        line-height: 60px;
        background: #3bb9f3;
        color: #fff;
        .header-title{
            text-align: left;
            color: white;
            font-size: 1.5em;
            font-family: 'KaiTi', serif;
        }
        .user-container{
            text-align: right;
            float:right;
            padding-right: 50px;
            .el-icon-arrow-down {
                font-size: 12px;
            }
            .user-info{
                cursor: pointer;
                color: white;
            }
        }
    }
    .text-area{
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
        aside{
            flex:0 0 200px;
            width: 230px;
            background: #E1EBFF;
        }
    }
    .content-container {
        flex:1;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
            .title {
                width: 200px;
                float: left;
                color: #475669;
            }
            .breadcrumb-inner {
                float: right;
            }
        }
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
}
.radius {
    height: 264px;
    width: 186px;
    border-radius: 20px;
    margin-top: 20px;
}

.boxButton {
    height: 264px;
    width: 186px;
    border-radius: 20px;
}

.boxImage {
    height: 264px;
    width: 186px;
}
</style>