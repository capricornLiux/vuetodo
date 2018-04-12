<template>
    <!-- 根据事项的完成情况, 展示不同的样式 -->
    <div v-bind:class="[todo.completed ? 'completed' : '', 'todo-item']">
        <!-- 显示完成情况的checkbox -->
        <input 
            type="checkbox"
            class="toggle"
            v-model="todo.completed"
        >
        <!-- 显示事项内容 -->
        <label>{{todo.content}}</label>

        <!-- 删除事项按钮 -->
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
export default {
  // 父组件传递过来的数据
  props: {
    // todo事项对象
    todo: {
      type: Object,
      required: true // 必传
    }
  },
  methods: {
    // 删除事项触发的操作
    deleteTodo () {
      // 触发一个事件, 把id传递出去
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-item {
  position: relative;
  background-color: #fff;
  font-size: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:hover {
    .destory:after {
      content: '×';
    }
  }

  label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }

  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }
}

.toggle {
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  outline: none;

  &:after {
    content: url('../../assets/images/round.svg');
  }

  &:checked:after {
    content: url('../../assets/images/done.svg');
  }
}

.destory {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color: transparent;
  appearance: none;
  border-width: 0;
  cursor: pointer;
  outline: none;
}
</style>


