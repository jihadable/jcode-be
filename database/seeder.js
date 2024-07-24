const { hash } = require("bcrypt")
const { db } = require("./database")
const { v4 } = require("uuid")

require("dotenv").config()

const seeder = async() => {
    await Promise.all([
        userSeeder(),
        problemSeed(),
        testCaseSeeder(),
        defaultCodesSeeder()
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
    const query = "INSERT INTO problems (id, slug, title, description, difficulty, function_name) VALUES (?, ?, ?, ?, ?, ?)"

    const problems = [
        {
            title: "Tribonacci",
            description: 
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Ketika berkunjung ke negara Italia, Pak Samsul bertemu dengan seorang Matematikawan bernama Prof. Paulo Tribonacci. Prof Paulo ini menciptakan sebuah deret bilangan Tribonacci di mana suatu bilangan merupakan hasil penjumlahan dari 3 bilangan sebelum nya. Karena Pak Samsul adalah orang yang penasaran, Ia pun ingin mencoba menjawab deret bilangan ke-n di mana n adalah angka yang disebutkan oleh Prof Paulo.</div>
                    <br>
                    <div>Buatlah program untuk membantu Pak Samsul menjawab deret bilangan dari setiap angka yang disebutkan Prof Paulo!</div>
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
                            <b>Input: </b> <code>n = 4</code>
                            <br>
                            <b>Output: </b> <code>6</code>
                            <br>
                            <b>Penjelasan: </b> <code>1 + 2 + 3 = 6.</code>
                        </div>
                    </div>
                    <br>
                    <div>
                        <h4>Contoh 2</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>n = 5</code>
                            <br>
                            <b>Output: </b> <code>11</code>
                            <br>
                            <b>Penjelasan: </b> <code>2 + 3 + 6 = 11.</code>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• <code>1 <= n <= 100</code></div>
                </div>
            </div>`,
            difficulty: "Easy",
            function_name: "tribonacci"
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
                        <code>
                            <div>M + B = H</div>
                            <div>M + K = H</div>
                            <div>M + H = B</div>
                            <div>B + K = M</div>
                            <div>B + H = K</div>
                            <div>K + H = M</div>
                        </code>
                        <br>
                        <code>
                            <b>Keterangan:</b>
                            <div>M: Merah</div>
                            <div>B: Biru</div>
                            <div>K: Kuning</div>
                            <div>H: Hijau</div>
                        </code>
                    </div>
                    <br>
                    <div>Mengetahui hal ini, Pak Samsul berinisiatif untuk memberikan Mawar permainan warna bernama segitiga warna. Pak Samsul memberikan 1 baris berisi warna-warna favorit Mawar. Mawar lalu mencampur setiap 2 warna yang bersebelahan sampai akhir nya hanya tersisa 1 warna saja. Mawar harus bisa menjawab 1 warna terakhir tersebut dengan benar.</div>
                    <br>
                    <div>Buatlah program untuk membantu Mawar menyelesaikan permainan segitiga warna ini!</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• barisWarna: array berisi string</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>barisWarna = [M, B]</code>
                            <br>
                            <b>Output: </b> <code>H</code>
                            <br>
                            <b>Penjelasan: </b> <code>M + B = H.</code>
                        </div>
                    </div>
                    <br>
                    <div>
                        <h4>Contoh 2</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>barisWarna = [B, K, H]</code>
                            <br>
                            <b>Output: </b> <code>M</code>
                            <br>
                            <b>Penjelasan: </b> <code>(B + K) + (K + H) = M + M = M.</code>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• <code>1 <= barisWarna.length <= 100</code></div>
                </div>
            </div>`,
            difficulty: "Medium",
            function_name: "segitigaWarna"
        },
        {
            title: "Kata dalam Kotak",
            description: 
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Pak Samsul memiliki peternakan ayam. Karena ayam-ayam yang Pak Samsul bukan lah ayam biasa, Ia pun ingin menguji salah satu ayam nya yang bernama Roger untuk bermain permainan "Kata dalam Kotak".</div>
                    <br>
                    <div>Permainannya sangat sederhana, Roger hanya perlu menjawab apakah kata yang disebutkan oleh Pak Samsul terdapat di dalam Kotak berukuran <code>m x n</code>. Suatu kata dikatakan terdapat di dalam kotak apabila kata tersebut bisa dibentuk oleh huruf-huruf di dalam kotak secara menurun ataupun ke samping kanan.</div>
                    <br>
                    <div>Buatlah program untuk membantu Roger menyelesaikan permainan Kata dalam Kotak ini!</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• kata: string</div>
                    <div>• kotak: array dua dimensi yang berisi string</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>kata = "roger", kotak = [["b", "c", "r", "o"], ["c", "z", "o", "a"], ["f", "h", "g", "e"], ["j", "i", "e", "p"], ["t", "s", "r", "k"]]</code>
                            <br>
                            <b>Output: </b> <code>true</code>
                            <br>
                            <b>Penjelasan: </b> <code>Kata "roger" bisa dibentuk secara menurun dengan huruf-huruf dari kotak[0][2], kotak[1][2], kotak[2][2], kotak[3][2], kotak[4][2].</code>
                        </div>
                    </div>
                    <br>
                    <div>
                        <h4>Contoh 2</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>kata = "mawar", kotak = [["c", "o", "v", "y", "n"], ["m", "a", "y", "a", "r"], ["l", "k", "t", "f", "g"]]</code>
                            <br>
                            <b>Output: </b> <code>false</code>
                            <br>
                            <b>Penjelasan: </b> <code>Kata "mawar" tidak dapat dibentuk oleh huruf-huruf dari kotak secara manurun maupun ke samping kanan.</code>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• <code>1 <= kata.length <= 100</code></div>
                    <div>• <code>1 <= m, n <= 100</code></div>
                </div>
            </div>`,
            difficulty: "Hard",
            function_name: "kataDalamKotak"
        },
        {
            title: "Pembagian Permen",
            description: 
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Karena Hari Ayam Nasional telah tiba, Pak Samsul ingin membagikan permen ke setiap ayam peliharaannya. Setiap ayam akan mendapatkan permen sebanyak nilai yang diperoleh dari nama mereka.</div>
                    <br>
                    <div>Contoh: Seekor Ayam bernama "Roger" akan mendapatkan nilai sebesar = R(18) + o(15) + g(7) + e(5) + r(18) = 73.</div>
                    <br>
                    <div>Namun, Pak Samsul adalah orang yang adil, Ia ingin setiap ayam nya memiliki jumlah permen yang sama. Untuk melakukan hal itu, Pak Samsul perlu membagikan permen ke setiap ayam sesuai dengan jumlah maksimal permen yang mungkin didapatkan oleh satu ekor ayam.</div>
                    <br>
                    <div>Buatlah program untuk membantu Pak Samsul mengetahui jumlah permen yang perlu Ia siapkan untuk membahagiakan setiap ayam peliharaanya!</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• ayam: array berisi string</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>ayam = ["Roger", "Bambang", "Yuli"]</code>
                            <br>
                            <b>Output: </b> <code>219</code>
                            <br>
                            <b>Penjelasan: </b> <code>Karena ayam yang mendapatkan permen terbanyak adalah Roger, maka Pak Samsul perlu menyiapkan sebanyak (73 * 3) permen.</code>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• <code>1 <= ayam.length <= 100</code></div>
                </div>
            </div>`,
            difficulty: "Easy",
            function_name: "pembagianPermen"
        },
        {
            title: "Pot Bunga",
            description:
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Akhir-akhir ini Pak Samsul memiliki hobi baru yaitu mengoleksi bunga. Ia memiliki aturan unik ketika menanam bunga dalam pot yaitu tidak boleh ada dua bunga yang ditanam di pot yang bersebelahan.</div>
                    <br>
                    <div>Suatu hari, Ia dihadiahkan sejumlah bunga oleh sahabat pena nya ada di Argentina. Karena masih banyak pot bunga yang kosong, Pak Samsul pun berencana untuk mengisi nya dengan bunga-bunga baru nya. Pak Samsul ingin mengetahui apakah semua bunga baru nya bisa ditanam di pot-pot bunga yang ada.</div>
                    <br>
                    <div>Buatlah program untuk memabantu Pak Samsul tanpa melanggar aturan unik nya!</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• deretanPot: array berisi angka 1 (pot berisi bunga) atau 0 (pot masih kosong)</div>
                    <div>• banyakBunga: Integer</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>deretanPot = [1, 0, 0, 0, 1], banyakBunga = 1</code>
                            <br>
                            <b>Output: </b> <code>true</code>
                            <br>
                            <b>Penjelasan: </b> <code>Setelah diisi dengan 1 bunga, deretanPot akan menjadi = [1, 0, 1, 0, 1].</code>
                        </div>
                    </div>
                    <br>
                    <div>
                        <h4>Contoh 2</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>deretanPot = [1, 0, 0, 0, 1], banyakBunga = 2</code>
                            <br>
                            <b>Output: </b> <code>false</code>
                            <br>
                            <b>Penjelasan: </b> <code>Pengisian 2 bunga ke dalam deretanPot akan melanggar aturan Pak Samsul.</code>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• <code>1 <= deretanPot.length <= 100</code></div>
                    <div>• <code>1 <= banyakBunga.length <= 100</code></div>
                </div>
            </div>`,
            difficulty: "Medium",
            function_name: "potBunga"
        },
        {
            title: "Perlombaan Lari",
            description:
            `<div>
                <div>
                    <h3>Deskripsi</h3>
                    <div>Pak Samsul sedang mengadakan lomba lari untuk ayam-ayam peliharaannya. Pak Samsul ingin membagi peserta lomba menjadi beberapa kelompok. Pembagian kelompok ditentukan berdasarkan anagram dari setiap nama peserta. 2 nama peserta disebut anagram ketika salah satu nama dapat disusun ulang dan membentuk nama lain nya.</div>
                    <br>
                    <div>Contoh: "hantu" dan "hutan" adalah anagram.</div>
                    <br>
                    <div>Buatlah program untuk membantu Pak Samsul mengetahui jumlah kelompok yang terbentuk sesuai dengan aturan pembagian!</div>
                </div>
                <br>
                <div>
                    <h3>Tipe Data Input</h3>
                    <div>• pesertaLomba: array berisi string</div>
                </div>
                <br>
                <div>
                    <div>
                        <h4>Contoh 1</h4>
                        <div style="padding-left: .5rem; border-left: 1px solid #ddd;">
                            <b>Input: </b> <code>pesertaLomba = ["Roger", "Lia", "Budi", "Ali"]</code>
                            <br>
                            <b>Output: </b> <code>3</code>
                            <br>
                            <b>Penjelasan: </b> <code>kelompok yang terbentuk = [["Roger"], ["Lia", "Ali"], ["Budi"]].</code>
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <h3>Batasan</h3>
                    <div>• <code>1 <= pesertaLomba.length <= 100</code></div>
                </div>
            </div>`,
            difficulty: "Hard",
            function_name: "perlombaanLari"
        }
    ]

    problems.forEach(async(problem, index) => {
        const slug = v4()

        await db.query(query, [
            index + 1,
            slug,
            problem.title,
            problem.description,
            problem.difficulty,
            problem.function_name
        ])
    })
}

const testCaseSeeder = async() => {
    const query = "INSERT INTO test_cases (problem_id, input, expected_output) VALUES (?, ?, ?)"

    const testCase1 = [
        {
            problem_id: 1,
            input: "1",
            expected_output: "1"
        },
        {
            problem_id: 1,
            input: "3",
            expected_output: "3"
        },
        {
            problem_id: 1,
            input: "5",
            expected_output: "11"
        },
        {
            problem_id: 1,
            input: "10",
            expected_output: "230"
        },
        {
            problem_id: 1,
            input: "12",
            expected_output: "778"
        },
        {
            problem_id: 1,
            input: "15",
            expected_output: "4841"
        },
        {
            problem_id: 1,
            input: "16",
            expected_output: "8904"
        },
        {
            problem_id: 1,
            input: "17",
            expected_output: "16377"
        },
        {
            problem_id: 1,
            input: "18",
            expected_output: "30122"
        },
        {
            problem_id: 1,
            input: "20",
            expected_output: "101902"
        }
    ]

    const testCase2 = [
        {
            problem_id: 2,
            input: '["M"]',
            expected_output: "M"
        },
        {
            problem_id: 2,
            input: '["K", "H"]',
            expected_output: "M"
        },
        {
            problem_id: 2,
            input: '["B", "K", "M"]',
            expected_output: "B"
        },
        {
            problem_id: 2,
            input: '["H", "H", "B", "K"]',
            expected_output: "B"
        },
        {
            problem_id: 2,
            input: '["M", "M", "M", "B", "H"]',
            expected_output: "H"
        },
        {
            problem_id: 2,
            input: '["B", "M", "H", "B", "B", "K"]',
            expected_output: "K"
        },
        {
            problem_id: 2,
            input: '["K", "K", "K", "K", "K", "K", "K"]',
            expected_output: "K"
        },
        {
            problem_id: 2,
            input: '["K", "M", "K", "M", "B", "B", "H", "H"]',
            expected_output: "H"
        },
        {
            problem_id: 2,
            input: '["H", "B", "K", "M", "H", "B", "K", "M", "H"]',
            expected_output: "H"
        },
        {
            problem_id: 2,
            input: '["M", "K", "B", "H", "H", "B", "K", "M", "M", "B"]',
            expected_output: "H"
        }
    ]

    const testCase3 = [
        {
            problem_id: 3,
            input: '"roger", [["b", "c", "r", "o"], ["c", "z", "o", "a"], ["f", "h", "g", "e"], ["j", "i", "e", "p"], ["t", "s", "r", "k"]]',
            expected_output: "true"
        },
        {
            problem_id: 3,
            input: '"mawar", [["c", "o", "v", "y", "n"], ["m", "a", "y", "a", "r"], ["l", "k", "t", "f", "g"]]',
            expected_output: "false"
        },
        {
            problem_id: 3,
            input: '"a", [["t", "a", "u", "q", "n"], ["m", "x", "y", "r", "r"], ["b", "f", "t", "f", "q"]]',
            expected_output: "true"
        },
        {
            problem_id: 3,
            input: '"oval", [["o", "o", "v"], ["v", "a", "y"], ["a", "k", "t"], ["l", "k", "t"]]',
            expected_output: "true"
        },
        {
            problem_id: 3,
            input: '"abcdefg", [["z", "x", "e", "k", "u", "y", "n"], ["j", "a", "s", "a", "p", "b", "h"]]',
            expected_output: "false"
        },
        {
            problem_id: 3,
            input: '"rhgbtqm", [["e", "c", "r"], ["r", "r", "h"], ["k", "p", "g"], ["s", "u", "b"], ["z", "v", "t"], ["q", "k", "q"], ["l", "r", "m"]]',
            expected_output: "true"
        },
        {
            problem_id: 3,
            input: '"aa", [["b", "h"], ["w", "i"]]',
            expected_output: "false"
        },
        {
            problem_id: 3,
            input: '"kgdet", [["r", "t", "v", "y", "g"], ["v", "d", "d", "d", "w"], ["v", "q", "r", "f", "m"]]',
            expected_output: "false"
        },
        {
            problem_id: 3,
            input: '"plmnb", [["r", "t", "c", "e"], ["e", "f", "g", "g"]]',
            expected_output: "false"
        },
        {
            problem_id: 3,
            input: '"dede", [["c", "d", "e", "d", "e", "n"], ["x", "x", "y", "a", "t", "q"], ["f", "e", "t", "f", "i", "z"]]',
            expected_output: "true"
        }
    ]

    const testCase4 = [

    ]

    const testCase5 = [

    ]

    const testCase6 = [

    ]

    const testCases = [...testCase1, ...testCase2, ...testCase3]

    testCases.forEach(async(testCase) => {
        await db.query(query, [
            testCase.problem_id, 
            testCase.input,
            testCase.expected_output
        ])
    })
}

const defaultCodesSeeder = async() => {
    const query = "INSERT INTO default_codes (problem_id, language, default_code) VALUES (?, ?, ?)"

    const defaultCodes = [
        {
            problem_id: 1,
            language: "javascript",
            default_code: 
            `function tribonacci(n){\n\n}`
        },
        {
            problem_id: 1,
            language: "python",
            default_code: 
            `def tribonacci(n):`
        },
        {
            problem_id: 2,
            language: "javascript",
            default_code: `function segitigaWarna(barisWarna){\n\n}`
        },
        {
            problem_id: 2,
            language: "python",
            default_code: 
            `def segitigaWarna(barisWarna):`
        },
        {
            problem_id: 3,
            language: "javascript",
            default_code: `function kataDalamKotak(kata, kotak){\n\n}`
        },
        {
            problem_id: 3,
            language: "python",
            default_code: 
            `def kataDalamKotak(kata, kotak):`
        },
        {
            problem_id: 4,
            language: "javascript",
            default_code: 
            `function pembagianPermen(ayam){\n\n}`
        },
        {
            problem_id: 4,
            language: "python",
            default_code: 
            `def pembagianPermen(ayam):`
        },
        {
            problem_id: 5,
            language: "javascript",
            default_code: `function potBunga(deretanPot, banyakBunga){\n\n}`
        },
        {
            problem_id: 5,
            language: "python",
            default_code: 
            `def potBunga(deretanPot, banyakBunga):`
        },
        {
            problem_id: 6,
            language: "javascript",
            default_code: `function perlombaanLari(pesertaLomba){\n\n}`
        },
        {
            problem_id: 6,
            language: "python",
            default_code: 
            `def perlombaanLari(pesertaLomba):`
        }
    ]

    defaultCodes.forEach(async(defaultCode) => {
        await db.query(query, [
            defaultCode.problem_id,
            defaultCode.language,
            defaultCode.default_code
        ])
    })
}

module.exports = seeder