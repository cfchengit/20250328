let seaweeds = []; // 儲存水草屬性的陣列
const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']; // 五種顏色
let serweednum = 90; // 水草數量

function setup() { //初始值設定
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute');
  canvas.style('z-index', '1'); // 確保畫布在 iframe 上層
  canvas.style('pointer-events', 'none'); // 允許滑鼠事件穿透畫布

  // 新增 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('border', 'none');
  iframe.style('z-index', '0'); // 確保 iframe 在畫布下層

  for (let i = 0; i < serweednum; i++) { // 初始化水草的屬性
    seaweeds.push({
      baseX: (i + 0.5) * (width / serweednum), // 水草的水平位置，均勻分布
      height: random(140, 420), // 水草的高度
      color: random(colors), // 從五種顏色中隨機選擇，直接使用字串
      thickness: random(15, 35), // 水草的粗細
      frequency: random(0.02, 0.08) // 水草的搖晃頻率
    });
  }
}

function draw() { //畫圖
  clear(); // 清除畫布，確保透明效果
  blendMode(BLEND); // 設定混合模式為 BLEND，產生透明效果

  for (let i = 0; i < seaweeds.length; i++) { // 繪製每條水草
    let seaweed = seaweeds[i];
    let baseY = height; // 水草的底部位置

    strokeWeight(seaweed.thickness); // 設定水草的粗細
    let seaweedColor = color(seaweed.color); // 將字串轉為顏色
    seaweedColor.setAlpha(150); // 設定透明度
    stroke(seaweedColor); // 設定水草的顏色
    noFill(); // 確保線條內部不填充

    beginShape(); // 使用多點繪製線條
    for (let y = baseY; y >= baseY - seaweed.height; y -= 5) { // 每隔5像素繪製一點
      let sway = sin(frameCount * seaweed.frequency + y * 0.02) * map(y, baseY, baseY - seaweed.height, 5, 20); // 搖晃幅度，越靠近底部越小
      vertex(seaweed.baseX + sway, y); // 繪製點
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //畫布大小隨視窗大小改變

  for (let i = 0; i < seaweeds.length; i++) { // 重新計算每條水草的水平位置
    seaweeds[i].baseX = (i + 0.5) * (width / serweednum); // 根據新的視窗寬度重新分布
  }
}
