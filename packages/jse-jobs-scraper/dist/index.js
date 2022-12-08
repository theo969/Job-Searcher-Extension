"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeJobDetail = exports.scrapeAllJobs = void 0;
const puppeteer_1 = require("puppeteer");
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const scrapeJobDetail_1 = __importDefault(require("./scrapeJobDetail"));
exports.scrapeJobDetail = scrapeJobDetail_1.default;
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
let allJobsResult = [];
function scrapeAllJobs(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("\u2714 ", url);
        const browser = yield puppeteer_extra_1.default.launch({ headless: true, args: [
                "--no-sandbox",
                "--disable-gpu",
            ], executablePath: (0, puppeteer_1.executablePath)() });
        const page = yield browser.newPage();
        let maxPages = 10;
        yield page.goto(url, { waitUntil: "domcontentloaded" });
        const getAllJobs = (page) => __awaiter(this, void 0, void 0, function* () {
            return yield page.evaluate(() => {
                let result = [];
                let jobsList = document.querySelectorAll('.jobsearch-ResultsList > li div.job_seen_beacon');
                jobsList.forEach((el) => {
                    let salaryInfo = [];
                    if (el.querySelector("div.salary-snippet-container") !== null && el.querySelector("div.estimated-salary-container") === null) {
                        salaryInfo.push(el.querySelector("div.salary-snippet-container").innerText);
                    }
                    else if (el.querySelector("div.estimated-salary-container") !== null && el.querySelector("div.salary-snippet-container") === null) {
                        salaryInfo.push(el.querySelector("div.estimated-salary-container").innerText);
                    }
                    let job = {
                        jobTitle: el.querySelector('.resultContent div > h2 > a').innerText,
                        companyName: el.querySelector('span.companyName').innerText,
                        companyLocation: el.querySelector("div.companyLocation").innerText,
                        postDate: el.querySelector("span.date").innerText,
                        salaryInfo,
                        snippet: el.querySelector("div.job-snippet").innerText,
                        jobId: el.querySelector("[data-jk]").getAttribute("data-jk"),
                        detailLink: `https//www.indeed.com/viewjob?jk=${el.querySelector("[data-jk]").getAttribute("data-jk")}`,
                    };
                    result.push(job);
                });
                return result;
            });
        });
        allJobsResult.push(yield getAllJobs(page));
        if (typeof (yield page.$("nav[role=navigation] > div > a[aria-label='Next Page']")) !== null) {
            let check = (yield page.$("nav[role=navigation] > div > a[aria-label='Next Page']")) !== null;
            let paginationLink = check ? yield page.$eval("nav[role=navigation] > div > a[aria-label='Next Page']", element => element.getAttribute("href")) : null;
            let paginationPage = paginationLink ? paginationLink.split("start=")[1].replace("start=", '') : null;
            let nextUrl = check ? "https://www.indeed.com".concat(yield page.$eval("nav[role=navigation] > div > a[aria-label='Next Page']", element => element.getAttribute("href"))) : '';
            yield browser.close();
            if (nextUrl !== null && paginationPage !== null) {
                let maxPagesNumber = maxPages * 10 - 10;
                if (Number(paginationPage) <= maxPagesNumber) {
                    return yield scrapeAllJobs(nextUrl);
                }
            }
        }
        return allJobsResult;
    });
}
exports.scrapeAllJobs = scrapeAllJobs;
