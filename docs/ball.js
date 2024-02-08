// 使用モジュール
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vector = Matter.Vector,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events;

// エンジンの生成
const engine = Engine.create();

// 物理演算canvasを挿入する要素
const canvas = $('#canvas-area')[0];

// レンダリングの設定
const render = Render.create({
    element: canvas,
    engine: engine,
    options: {
        width: 1500,
        height: 600,
    }
});

// マウス、マウス制約を生成
const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: false
        }
    }
})

Composite.add(engine.world, mouseConstraint)
render.mouse = mouse

// レンダリングを実行
Render.run(render);

// エンジンを実行
Runner.run(engine);

/**
 * 以下、各例毎に処理を記述する
 */
// 静止オブジェクト(空中の床と地面)【①】
const floor1 = Bodies.rectangle(400, 200, 500, 30, { isStatic: true });
const floor2 = Bodies.rectangle(150, 350, 300, 30, { angle: Math.PI / 6, isStatic: true });
const floor3 = Bodies.rectangle(650, 350, 300, 30, { angle: -Math.PI / 6, isStatic: true });
const ground = Bodies.rectangle(400, 585, 1645, 30, { isStatic: true });
const ground2 = Bodies.rectangle(400, 20, 1645, 30, { isStatic: true });
const wall = Bodies.rectangle(25, 300, 30, 1200, { isStatic: true });
const wall2 = Bodies.rectangle(1200, 300, 30, 1200, { isStatic: true });

// 可動オブジェクト（正方形と円）【②】
const square = Bodies.rectangle(floor1.bounds.min.x, floor1.bounds.max.y - 50, 50, 50, { friction: 0.001 });
const circle = Bodies.circle(floor1.bounds.max.x, floor1.bounds.max.y - 50, 25, { friction: 0.01 });

// オブジェクトの追加【③】
Composite.add(engine.world, [ground, ground2, wall, wall2,]);

// オブジェクトの追加【④】
$('#add-ball').click(function () {
    // 新しいボールを作成
    var shape = Math.floor(Math.random() * 3);
    // ランダムなx座標とy座標を生成
    var x = 100;
    var y = 100;
    // x = Math.random() * window.innerWidth;
    // y = Math.random() * window.innerHeight;

    var newShape;
    switch (shape) {
        case 0: // 丸
            newShape = Bodies.circle(x, y, 25, { friction: 0.01 });
            break;
        case 1: // 四角
            newShape = Bodies.rectangle(x, y, 50, 50, { friction: 0.01 });
            break;
        case 2: // 三角
            newShape = Bodies.polygon(x, y, 3, 25, { friction: 0.01 });
            break;
    }

    // 新しいボールをエンジンの世界に追加
    Composite.add(engine.world, newShape);

    // エンジンの更新ごとに実行されるイベントを追加
    Events.on(engine, 'afterUpdate', function () {
        // 描画コンテキストを取得
        var context = render.context;

        // 描画設定
        context.font = '20px Arial';
        context.fillStyle = 'black';

        // テキストを図形の位置に描画
        context.fillText('wow', newShape.position.x, newShape.position.y);
    });
});
