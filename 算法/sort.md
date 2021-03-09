## 排序算法

 **常见排序算法时间复杂度，空间复杂度比较**

| 排序方法 | 平均情况 | 最好情况 | 最坏情况 | 辅助空间 |
| -------- | -------- | -------- | -------- | ---------- |
| 直接插入 | 0(n<sup>2</sup>)  | O(n) |   O(n<sup>2</sup>) | O(1) |
| 希尔排序 |  O(nlog<sub>2</sub>n) |     O(nlog<sub>2</sub>n)|     O(nlog<sub>2</sub>n) |     O(1)     |
|    冒泡排序 |   0(n<sup>2</sup>)  | O(n) |   O(n<sup>2</sup>) | O(1) |
|    快速排序 |   O(nlog<sub>2</sub>n)       |   O(nlog<sub>2</sub>n)       |      O(n<sup>2</sup>)    |    O(log<sub>2</sub>n) ~O(n)      |
|    选择排序 |   O(n<sup>2</sup>)|O(n<sup>2</sup>) |O(n<sup>2</sup>)  |       O(1)   |
|    堆排序 | O(nlog<sub>2</sub>n)|O(nlog<sub>2</sub>n)|O(nlog<sub>2</sub>n)|O(1)|
|    归并排序 |O(nlog<sub>2</sub>n)|O(nlog<sub>2</sub>n)|O(nlog<sub>2</sub>n)|O(n)|

### 1. 直接插入排序

- 步骤1: 从第一个元素开始，该元素可以认为已经被排序；
- 步骤2: 取出下一个元素，在已经排序的元素序列中从后向前扫描；
- 步骤3: 如果该元素（已排序）大于新元素，将该元素移到下一位置；
- 步骤4: 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
- 步骤5: 将新元素插入到该位置后；
- 步骤6: 重复步骤2~5。

```javascript
  function insertSort(arr) {
    if(arr.length == 0) return arr;
    var cur;
    for(var i=0; i<arr.length -1; i++){
      cur = arr[i+1]
      var preIndex = i;
      while(preIndex >= 0 && cur < arr[preIndex]){
        arr[preIndex+1] = arr[preIndex];
        preIndex --;
      }
      arr[preIndex+1] = cur;
    }
  }
```

### 2. 希尔排序

  先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：    

- 步骤1：选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
- 步骤2：按增量序列个数k，对序列进行k 趟排序；
- 步骤3：每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

```javascript
  function shellSort(arr){
    var gap = arr.length / 2;
    var temp;
    while(gap > 0){
      for(var i=gap; i < arr.length; i++){
        temp = arr[i];
        var preIndex = i-gap;
        while(preIndex >= 0 && arr[preIndex] > temp){
          arr[preIndex + gap] = arr[preIndex];
          preIndex -= gap;
        }
        arr[preIndex + gap] = temp;
      }
      gap >>= 1
      //gap = Math.floor(gap / 2);
    }
  }
```

### 3.冒泡排序

算法描述    

- 步骤1: 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
- 步骤2: 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
- 步骤3: 针对所有的元素重复以上的步骤，除了最后一个；
- 步骤4: 重复步骤1~3，直到排序完成。

```javascript

  function bubbleSort(arr){
    if(arr.length == 0) return arr;
    for(var i=0; i < arr.length; i++){
      for(var j=0; j < arr.length-1-i; j++){
        if(arr[j+1] < arr[j]){
          arr[j] ^= arr[j+1]
          arr[j+1] ^= arr[j]
          arr[j] ^= arr[j+1]
        }
      }
    }
  }
```

### 4. 快速排序

算法描述：

- 步骤1：从给定数组中选定一个基准数，记为`pivot`
- 步骤2：设置双指针分别指向数组头部和尾部，与基准数比较，小的置于基准数左边，大的置于右边。
- 步骤3： 按基准点分为两部分的数组重复步骤1,2 （递归）
- 步骤四： 直到，数组不能再分为两部分结束。

```javascript
  function quick_sort(arr,l,r){
    if(l >= r) return;
    let i=l,j=r,midIndex=(l+r)>>1
    while(i<j){
      while(arr[i] < arr[midIndex]) i++;
      while(arr[j] > arr[midIndex]) j--;
      if(i < j) swap(arr,i,j)
    }
    quick_sort(arr,l,j)
    quick_sort(arr,j+1,r)
  }
```

### 5. 归并排序

- 步骤1：把长度为n的输入序列分成两个长度为n/2的子序列；
- 步骤2：对这两个子序列分别采用归并排序；
- 步骤3：将两个排序好的子序列合并成一个最终的排序序列。

```javascript
  function merge_sort(arr,l,r){
    temp = []
    if(l>=r) return;
    let mid = (l + r) >> 1;
    merge_sort(arr,l,mid);
    merge_sort(arr,mid+1,r);
    let i = l, j = mid+1, k = 0;
    while(i <= mid && j <= r){
      if(arr[i] > arr[j]) temp[k++] = arr[i++];
      else temp[k++] = arr[j++]; 
    }
    while(i <= mid) temp[k++] = arr[i++]
    while(j <= r) temp[k++] = arr[j++]
    for(let i = l,k=0; i <= r; i++){
      arr[i] = temp[k++]
    }
  }
```

### 6. 堆排序

- 步骤1：将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
- 步骤2：将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
- 步骤3：由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

```javascript
function adjustHeap(arr,i){
    let len = arr.length;
    let maxIndex = i;
    if(i*2+1 < len && (arr[i*2+1] > arr[maxIndex])){
      maxIndex = i * 2 + 1 ;
    }
    if(i*2+2 < len && (arr[i*2+2] > arr[maxIndex])){
      maxIndex = i * 2 + 2;
    }
    if(maxIndex != i) {
      swap2(arr,i,maxIndex);
      adjustHeap(arr, maxIndex)
    }
  }
  function headSort(arr){
    let len = arr.length;
    if(len <= 1 ) return arr;
    let i = len-1;
    buildMaxHeap(arr);
    while(i > 0){
      swap2(arr,0,i);
      adjustHeap(arr,i);
      i--;
    }
    return arr;
  }
  const swap2 = function(arr, a,b){
    let temp = arr[b]
    arr[b] = arr[a]
    arr[a] = temp;
  }
```

