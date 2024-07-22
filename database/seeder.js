const { hash } = require("bcrypt")
const { db } = require("./database")
const { v4 } = require("uuid")

require("dotenv").config()

const seeder = async() => {
    await Promise.all([
        userSeeder(),
        problemSeed(),
        testCaseSeeder()
    ])
}

const userSeeder = async() => {
    const query = "INSERT INTO users (username, email, password, bio) VALUES (?, ?, ?, ?)"

    const hashedPassword = await hash(process.env.PRIVATE_PASSWORD, 10);

    await db.query(query, [
        "Jihadable",
        "umarjihad@gmail.com",
        hashedPassword,
        "test"
    ])
}

const problemSeed = async() => {
    const query = "INSERT INTO problems (slug, title, description, difficulty) VALUES (?, ?, ?, ?)"

    const problems = [
        {
            title: "Tribonacci",
            description: 
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Ketika berkunjung ke negara Italia, Pak Samsul bertemu dengan seorang Matematikawan bernama Prof. Paulo Tribonacci. Prof Paulo ini menciptakan sebuah deret bilangan Tribonacci di mana suatu bilangan merupakan hasil penjumlahan dari 3 bilangan sebelum nya. Karena Pak Samsul adalah orang yang penasaran, Ia pun ingin mencoba menjawab deret bilangan ke-n di mana n adalah angka yang disebutkan oleh Prof Paulo. Buatlah program untuk membantu Pak Samsul menjawab deret bilangan dari setiap angka yang disebutkan Prof Paulo.</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• n: Integer</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> n = 4
                            <br>
                            <b>Output: </b> 6
                            <br>
                            <b>Penjelasan: </b> 1 + 2 + 3 = 6
                        </div>
                    </div>
                    <br>
                    <div>
                        <h4>Contoh 2</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> n = 5
                            <br>
                            <b>Output: </b> 11
                            <br>
                            <b>Penjelasan: </b> 2 + 3 + 6 = 11
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• 1 <= n <= 20</div>
                </div>
            </div>`,
            difficulty: "Easy"
        },
        {
            title: "Segitiga Warna",
            description: 
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Mawar yang merupakan anak bungsu Pak Samsul sangat gemar bermain dengan warna. Mawar sangat suka dengan warna merah, biru, kuning, dan hijau. Suatu hari, Mawar mengetahui bahwa setiap 2 warna yang dicampur akan menghasilkan warna lain. Mawar pun mencatat perubahan hasil campuran dari setiap warna favorit nya.</div>
                    <br>
                    <div>
                        <div>
                            <div>M + B = H</div>
                            <div>M + K = H</div>
                            <div>M + H = B</div>
                            <div>B + K = M</div>
                            <div>B + H = K</div>
                            <div>K + H = M</div>
                        </div>
                        <br>
                        <div>
                            <b>Keterangan:</b>
                            <div>M: Merah</div>
                            <div>B: Biru</div>
                            <div>K: Kuning</div>
                            <div>H: Hijau</div>
                        </div>
                    </div>
                    <br>
                    <div>Mengetahui hal ini, Pak Samsul berinisiatif untuk memberikan Mawar permainan warna bernama segitiga warna. Pak Samsul memberikan 1 baris berisi warna-warna favorit Mawar. Mawar lalu mencampur setiap 2 warna yang bersebelahan sampai akhir nya hanya tersisa 1 warna saja. Mawar harus bisa menjawab 1 warna terakhir tersebut dengan benar. Buatlah program untuk membantu Mawar menyelesaikan permain segitiga warna ini.</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• barisWarna: array of string</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> barisWarna = [M, B]
                            <br>
                            <b>Output: </b> H
                            <br>
                            <b>Penjelasan: </b> M + B = H
                        </div>
                    </div>
                    <br>
                    <div>
                        <h4>Contoh 2</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> barisWarna = [B, K, H]
                            <br>
                            <b>Output: </b> M
                            <br>
                            <b>Penjelasan: </b> (B + K) + (K + H) = M + M = M
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• 1 <= barisWarna.length <= 10</div>
                </div>
            </div>`,
            difficulty: "Medium"
        }
    ]

    problems.forEach(async(problem) => {
        const slug = v4()

        await db.query(query, [
            slug,
            problem.title,
            problem.description,
            problem.difficulty
        ])
    })
}

const testCaseSeeder = async() => {
    const query = "INSERT INTO test_cases (problem_id, input, expected_output) VALUES (?, ?, ?)"

    const testCases = [
        {
            problem_id: 2,
            input: "5",
            expected_output: "11"
        },
        {
            problem_id: 2,
            input: "10",
            expected_output: "230"
        },
        {
            problem_id: 2,
            input: "15",
            expected_output: "4841"
        },
        {
            problem_id: 2,
            input: "17",
            expected_output: "16377"
        },
        {
            problem_id: 2,
            input: "20",
            expected_output: "101902"
        },
        {
            problem_id: 1,
            input: '["M"]',
            expected_output: "M"
        },
        {
            problem_id: 1,
            input: '["K", "H"]',
            expected_output: "M"
        },
        {
            problem_id: 1,
            input: '["B", "K", "M"]',
            expected_output: "B"
        },
        {
            problem_id: 1,
            input: '["H", "H", "B", "K"]',
            expected_output: "B"
        },
        {
            problem_id: 1,
            input: '["M", "M", "M", "B", "H"]',
            expected_output: "H"
        },
        {
            problem_id: 1,
            input: '["B", "M", "H", "B", "B", "K"]',
            expected_output: "K"
        },
        {
            problem_id: 1,
            input: '["K", "K", "K", "K", "K", "K", "K"]',
            expected_output: "K"
        },
        {
            problem_id: 1,
            input: '["K", "M", "K", "M", "B", "B", "H", "H"]',
            expected_output: "H"
        },
        {
            problem_id: 1,
            input: '["H", "B", "K", "M", "H", "B", "K", "M", "H"]',
            expected_output: "H"
        },
        {
            problem_id: 1,
            input: '["M", "K", "B", "H", "H", "B", "K", "M", "M", "B"]',
            expected_output: "H"
        }
    ]

    testCases.forEach(async(testCase) => {
        await db.query(query, [
            testCase.problem_id, 
            testCase.input,
            testCase.expected_output
        ])
    })
}

module.exports = seeder