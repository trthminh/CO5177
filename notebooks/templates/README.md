# Notebook templates — DataInsight (CO5177)

One template per data type. They share the same skeleton, setup code, plot style and conventions, so the three notebooks the group submits read as one piece of work.

| Template | Owner | Final file |
|---|---|---|
| [`tabular_template.ipynb`](tabular_template.ipynb) | Trần Lê Hoàng Long | `notebooks/tabular.ipynb` |
| [`text_template.ipynb`](text_template.ipynb) | Tô Anh Phát | `notebooks/text.ipynb` |
| [`timeseries_template.ipynb`](timeseries_template.ipynb) | Trương Thanh Minh | `notebooks/timeseries.ipynb` |

The templates are **skeletons**: they contain no dataset. Generic cells (missing values, duplicates, split, pipelines, metrics, plots) work on any dataset once section 1.3 is filled in. Dataset-specific decisions are marked `✏️` (markdown) and `# TODO` (code).

## How to start

1. Copy the template to its final name, e.g. `notebooks/templates/text_template.ipynb` → `notebooks/text.ipynb`.
2. Fill in **section 1.3 Configuration** (data source, target/label columns, domain rules). Until every `"TODO"` there is replaced, the notebook stops with a clear message.
3. Upload the data to a public place if it is not already public: Kaggle (public dataset), Google Drive (*Anyone with the link → Viewer*, use the file id), or a direct URL. Never rely on a local file or a mounted Drive.
4. Run all, then go through every `✏️` / `TODO` from top to bottom.
5. Run the checklist below, then update `assets/js/data.js` (notebook path, dataset, problem, results).

## Shared skeleton (do not renumber)

| Section | Content | Assignment link |
|---|---|---|
| Title | Course, group, owner, dataset, task, problem statement, TOC, Colab badge | §6.2 |
| 1. Setup | install missing packages → imports → **configuration** → plot style | §6.4 Run all |
| 2. Data loading | `download_dataset` (url / gdrive / kaggle) → read → requirement check | §4 |
| 3. Dataset description | origin, column dictionary, dtypes, summary statistics | §5.1 |
| 4. Data quality checks | missing, duplicates, invalid values, outliers, balance (diagnose only) | §5.2 |
| 5. EDA | required views, then **question-driven analyses** (≥ 2) | §5.1, rubric §7.1 |
| 6. Data preparation | cleaning rules (before split) → split → transforms fitted on train | §5.2 |
| 7. Modeling | baseline + several scikit-learn models on validation → tuning → final model | §5.3 |
| 8. Evaluation on test | metrics, confusion matrix / forecast plot, importance, error analysis | §5.4 |
| 9. Inference on new data | raw new input → same preprocessing → prediction | end-to-end |
| 10. Conclusion | results table, findings, limitations, extensions, checklist | §5.4 |

## Conventions

**Cells**
- Pattern: markdown *what and why* → code (comments explain non-obvious lines and the role of each library call) → markdown **Observation / Conclusion** with numbers from the output.
- Every dataset-dependent constant lives in section 1.3; no magic numbers or column names hidden in later cells.
- One `SEED = 42` for every random step.

**Figures (Plotly only)**
- Build with `plotly.express` / `plotly.graph_objects`, display with `show_fig(fig, title)`, which numbers figures automatically.
- The title states the conclusion ("Class 1 is only 12% of samples"), axes have labels and units.
- Use the shared colour constants (`BLUE`, `ORANGE`, …, `SEQ_BLUE`, `DIVERGING`); no ad-hoc colours.
- Rubric §7.1: a figure earns points when it answers a question, its caption states the conclusion, and it has numbers to compare (before/after, model A vs B, correct vs wrong). Colour or a word cloud on its own earns nothing.

**Data leakage rules (checked by the lecturer)**
- Row-wise rules (strip text, fix spelling, drop duplicates, drop impossible values) run **before** the split.
- Statistics (imputer medians, scaler mean/std, one-hot categories, TF-IDF vocabulary and idf) are fitted on **train only**, inside a `Pipeline`.
- Validation chooses the model; test is used **once**, in section 8.
- Time series: chronological split, no shuffling; features only use information at least `HORIZON` steps old.

**Language**: English for code, markdown and figures.

## Submission checklist

- [ ] Colab: **Runtime → Restart and run all** finishes without errors; the notebook is saved **with outputs**.
- [ ] No `TODO`, `✏️`, placeholder or "How to use this template" cell left.
- [ ] Data downloads automatically (no upload, no Drive mount, no API key).
- [ ] Every figure: Plotly, numbered conclusion title, labelled axes, followed by an observation with numbers.
- [ ] Numbers written in markdown match the current outputs and the PDF report.
- [ ] Baseline included; model chosen on validation; test used once.
- [ ] At least two question-driven analyses in section 5 and a comparison (before/after, model A vs B, correct vs wrong).
- [ ] `assets/js/data.js` updated; `python scripts/check_links.py` passes.
